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
  const event = await eventsCollection.doc(req.params.event_id).get();
  if (!event){
    res.status(400).send('No such event was found');
  }
  // Converting Timestamp objects to Strings for frontend rendering
  let eventData = event.data();
  const newStartDate = eventData['start_date'].toDate();
  const newEndDate = eventData['end_date'].toDate();

  // Adjusting start hours, minutes, and time of day
  let newStartHours;
  let newEndHours;
  let newStartMinutes = newStartDate.getMinutes();
  let newEndMinutes = newEndDate.getMinutes();
  let start_timeOfDay = 'am';
  let end_timeOfDay = 'am';
  if (newStartDate.getHours() > 12) {
    newStartHours = newStartDate.getHours() - 12;
    start_timeOfDay = 'pm'
  } else {
    newStartHours = newStartDate.getHours();
  }
  if (newEndDate.getHours() > 12) {
    newEndHours = newEndDate.getHours() - 12;
    end_timeOfDay = 'pm'
  } else {
    newEndHours = newEndDate.getHours();
  }
  if (newStartMinutes == 0) {
    newStartMinutes = `${newStartMinutes}0`;
  }
  if (newEndMinutes == 0) {
    newEndMinutes = `${newEndMinutes}0`;
  }

  // String injection for new dates to render
  startDate = `${newStartDate.getMonth() + 1}/${newStartDate.getDate()}/${newStartDate.getFullYear()}
              at ${newStartHours}:${newStartMinutes}${start_timeOfDay}`

  endDate = `${newEndDate.getMonth() + 1}/${newEndDate.getDate()}/${newEndDate.getFullYear()}
              at ${newEndHours}:${newEndMinutes}${end_timeOfDay}`
  eventData['start_date'] = startDate;
  eventData['end_date'] = endDate;
  res.json(eventData);
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
    //console.log('User does not have any open events');
    return;
  } else if (!found) {
    res.status(400).send('User does not have an event with that id');
    //console.log('User does not have an event with that id');
    return;
  }

  // Gets event data
  const query = await eventsCollection.where('event_id', '==', req.params.event_id).get();
  let finalResult = [];
  query.forEach(doc => {
    finalResult.push(doc.data());
  })
  res.json(finalResult[0]);
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
    !req.body.max_applicants || !req.body.status ||
    !req.body.title || !req.body.type) {
    res.send("Missing fields on request");
  } else {
    // Generates a new event object with a randomly generated hash value
    const newEventRef = eventsCollection.doc();
    const event = {
      applications: [],
      creator_id: req.params.user_id,
      description: req.body.description,
      end_date: new Date(req.body.end_date),
      event_id: newEventRef.id,
      max_applicants: req.body.max_applicants,
      start_date: new Date(),
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
      //console.log("Document written with ID: ", newEventRef.id);
      res.json(event);
      res.status(200).send();
    })
    .catch(function(error) {
      //console.log("Error adding document", error);
      res.status(400).send(error);
    })
  }
})

router.get('/homepage/homework', async(req, res) => {
  const eventCollection = await db.collection('events');
  
  const homework = await eventCollection.where('type', '==', 'HOMEWORK');
  const query = await homework.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  displayedArr = results.splice(0,6);
  //console.log(displayedArr);
  res.json(displayedArr);
});
 
router.get('/homepage/games', async(req, res) => {
  const eventCollection = await db.collection('events');
 
  const game = await eventCollection.where('type', '==', 'GAMES');
  const query = await game.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  displayedArr = results.splice(0,6);
  //console.log(displayedArr);
  res.json(displayedArr);
});
 
router.get('/homepage/projects', async(req, res) => {
  const eventCollection = await db.collection('events');
 
  const project = await eventCollection.where('type', '==', 'PROJECTS');
  const query = await project.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  displayedArr = results.splice(0,6);
  //console.log(displayedArr);
  res.json(displayedArr);
});
 
router.get('/homepage/other', async(req, res) => {
  const eventCollection = await db.collection('events');

  const other = await eventCollection.where('type', '==', 'OTHER');
  const query = await other.get();
  let results = [];
  query.forEach(doc => {
    results = [...results, doc.data()]
  });
  displayedArr = results.splice(0,6);
  //console.log(displayedArr);
  res.json(displayedArr);;
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