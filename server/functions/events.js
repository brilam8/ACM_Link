const express = require('express');
const router = express.Router()
const { json } = require('express');
const {db, admin} = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const usersCollection = db.collection('users');
const eventsCollection = db.collection('events');
const applyCollection = db.collection('applications');


// @route GET getEvents
// @desc Gets all events in the database
router.get('/', async (req, res) => {
  const query = await eventsCollection.get();
  let result = [];
  query.forEach(doc => {
    result.push(doc.data());
  });
  res.json(result);
})


// @route GET getEvent(event_id)
// @desc Gets an event with a given id
router.get('/:event_id', async (req, res) => {
  // Queries for event
  const query = await eventsCollection.where(
    'event_id', '==', req.params.event_id).get();
  if (query.empty){
    res.status(400).send('No such event was found');
  }

  // Pushes event to result array to form response
  let result = [];
  query.forEach(doc => {
    result.push(doc.data());
  })
  res.json(result);
})


// @route GET getOwnerEvents(creator_id)
// @desc Returns all of the events the owner has created
router.get('/getOwnerEvents/:creator_id', async (req, res) => {
  // Gets user object
  const userRef = usersCollection.doc(req.params.creator_id);
  const userQuery = await userRef.get();
  let result;
  if (!userQuery.exists) {
    res.status(400).send('No user with the given id exists');
  } else {
    result = userQuery.data();
  }

  // Maps each event_id in the user's events array to the actual event object
  const userEvents = result.user_events;
  if (userEvents.empty) {
    res.send([]);
  }
  for (let i = 0; i < userEvents.length; i++) {
    const eventRef = eventsCollection.doc(userEvents[i]);
    const query = await eventRef.get();
    if (!query.exists) {
      res.status(400).send("Error. Event does not exist");
    }
    const data = query.data();
    userEvents[i] = data;
  }
  res.json(userEvents);
})


// TODO: How to differentiate between getuserevent and getevent?
// @route GET getOwnerEvent
// @desc Returns data for a single user's events
router.get('/getOwnerEvent/:creator_id/:event_id', async (req, res) => {
  // Obtains user object
  const userRef = usersCollection.doc(req.params.creator_id);
  const userQuery = await userRef.get();
  let result;
  if (!userQuery.exists) {
    res.status(400).send('No user with the given id exists');
  } else {
    result = userQuery.data();
    console.log('74', result);
  }
  
  // Checks to see if user has an open event with that passed-in event_id
  const userEvents = result.user_events;
  let found = 0;
  for (let i = 0; i < userEvents.length; i++) {
    if (userEvents[i] === req.params.event_id) {
      found = 1;
      break;
    }
  }
  if (userEvents.empty) {
    res.status(400).send('User does not have any open events');
  } else if (!found) {
    res.status(400).send('User does not have an event with that id');
  }

  // Gets event data
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get();
  let finalResult = [];
  query.forEach(doc => {
    finalResult.push(doc.data());
  })
  res.json(finalResult);
})


// Changed status from param to json body. Don't know if this was the
// right move. Change it back if you think status should be a parameter
// @route setOwnerEvent(event_id, status)
// @desc Sets the status as open or archived for an event
router.post('/setStatus/:event_id', async (req, res) => {
  if (!req.body || !req.body.status) {
    res.status(400).send("Missing fields on request");
  }
  // Queries for input event
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get();
  if(query.empty) {
    res.status(400).send('No such event was found');
  }
  
  // Updates the event reference with the new status
  const event = query.docs[0];
  event.ref.update({ status: req.body.status });
  res.send(`Event ${req.params.event_id}'s status updated to ${req.body.status}`);
})


// TODO: Date is hardcoded. Needs to be date objects.
// @route POST createEvent
// @desc creates an event and stores it in the database
router.post('/create/:user_id', async (req, res) => {
  if(!req.body || !req.body.description || !req.body.end_date || 
    !req.body.max_applicants || !req.body.start_date || !req.body.status ||
    !req.body.title || !req.body.type) {
    res.send("Missing fields on request");
  } else {
    // Generates a new event object with a randomly generated hash value
    const newEventRef = eventsCollection.doc();
    const event = {
      applications: [],
      creator_id: req.params.user_id,
      description: req.body.description,
      end_date: req.body.end_date,
      event_id: newEventRef.id,
      max_applicants: req.body.max_applicants,
      start_date: req.body.start_date,
      status: req.body.status,
      title: req.body.title,
      type: req.body.type     
    }

    // Attaches newly created event to user
    const query = await usersCollection.where(
      'user_id', '==', req.params.user_id).get();
    let results = [];
    query.forEach(doc => {
      results = [...results, doc.data()];
    })
    results = results[0];
    results.user_events.push(newEventRef.id);
    usersCollection.doc(req.params.user_id).set(results);

    // Writes event to database
    await newEventRef.set(event).then(function() {
      console.log("Document written with ID: ", newEventRef.id);
      res.json(event);
    })
    .catch(function(error) {
      console.log("Error adding document", error);
      res.status(400).send(error);
    })
  }
})

router.get('/api/homework', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "0101",
    creater_id: "1010",
    title: "Homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1111",
    creater_id: "2222",
    title: "Looking for gaming team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "3333",
    creater_id: "3232",
    title: "Side project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const homework = await eventCollection.where('type', '==', 'HOMEWORK');
  const query = await homework.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/videogames', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "1234",
    creater_id: "4321",
    title: "Finding homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const videoGame = await eventCollection.where('type', '==', 'VIDEOGAMES');
  const query = await videoGame.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/projects', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "4500",
    creater_id: "0123",
    title: "Hw group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);
 
  const project = await eventCollection.where('type', '==', 'PROJECTS');
  const query = await project.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});
 
router.get('/api/misc', async(req, res) => {
  const eventCollection = await db.collection('events');
  const test = {
    event_id: "1234",
    creater_id: "4321",
    title: "Finding homework group",
    type: "HOMEWORK",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test2 = {
    event_id: "1357",
    creater_id: "7531",
    title: "Looking for League team",
    type: "VIDEOGAMES",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }
 
  const test3 = {
    event_id: "2468",
    creater_id: "8642",
    title: "Seeking project group",
    type: "PROJECTS",
    status: true,
    start: "2020-10-31",
    end: "2020-11-01"
  }

  eventCollection.set(test);
  res.json(test);
  eventCollection.set(test2);
  res.json(test2);
  eventCollection.set(test3);
  res.json(test3);

  const misc = await eventCollection.where('type', '==', 'OTHER');
  const query = await misc.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  console.log(results);
  res.json(results);
});

// @route GET getApplicants
// @desc Returns all of the applications for a given event_id
router.get('/getApplicants/:event_id', async (req, res) => {
  // Gets event object and the array of application_id's
  const eventsRef = eventsCollection.doc(req.params.event_id);
  const query = await eventsRef.get();
  if(query.empty) {
    res.status(400).send('No such event was found');
  }
  data = query.data();
  
  // Maps each application_id in the user's applications array to the actual 
  // application object
  const applications = data.applications;
  if (applications.empty) {
    res.send([]);
  }
  for (let i = 0; i < applications.length; i++) {
    const applyRef = applyCollection.doc(applications[i]);
    const applyQuery = await applyRef.get();
    if (!applyQuery.exists) {
      res.status(400).send("Error. Application does not exist");
    }
    const data = applyQuery.data();
    applications[i] = data;
  }
  res.json(applications);
})


module.exports = router