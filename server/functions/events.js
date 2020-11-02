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

// TODO: Could we possibly make functions that we can place inside routes?
// Or would this be a bad idea?


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
  const query = await eventsCollection.where(
    'event_id', '==', req.params.event_id).get();
  if (query.empty){
    res.status(400).send('No such event was found');
  }
  let result = [];
  query.forEach(doc => {
    result.push(doc.data());
  })
  res.json(result);
})


// TODO: Cannot get events as json objects because of improper async
// function handling
// @route GET getOwnerEvents(creator_id)
// @desc Returns all of the events the owner has created
router.get('/getOwnerEvents/:creator_id', async (req, res) => {
  // Gets user object
  const userQuery = await usersCollection.doc(req.params.creator_id).get();
  let result;
  if (!userQuery.exists) {
    res.status(400).send('No user with the given id exists');
  } else {
    result = userQuery.data();
    console.log(result);
  }

  // Maps each event_id in the user's events array to the actual event object
  const userEvents = result.user_events;
  if (userEvents.empty) {
    res.send([]);
  }
  for (let i = 0; i < userEvents.length; i++) {
    const ref = await eventsCollection.doc(userEvents[i]);
    const query = await ref.get();
    if (!query.exists) {
      res.status(400).send("Error. Event does not exist");
    }
    const data = query.data();
    console.log('69', data);
    userEvents[i] = data;
  }
  res.json(userEvents);
})


// TODO: How to differentiate between getuserevent and getevent?
// @route GET getOwnerEvent
// @desc Returns data for a single user's events
router.get('/getOwnerEvent/:creator_id/:event_id', async (req, res) => {
  // Obtains user object
  const userQuery = await usersCollection.doc(req.params.creator_id).get();
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
  // This portion of code is from GET /:event_id
  // There must be a more efficient way to do this
  const query = await eventsCollection.where(
    'event_id', '==', req.params.event_id).get();
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
  console.log("in");
  if (!req.body || !req.body.status) {
    res.status(400).send("Missing fields on request");
  }
  const query = await eventsCollection.where(
    'event_id', '==', req.params.event_id).get();
  if(query.empty) {
    res.status(400).send('No such event was found');
  }
  const event = query.docs[0];
  event.ref.update({ status: req.body.status });
  res.send(`Event ${req.params.event_id}'s status updated to ${req.body.status}`);
})


// TODO: User id is hardcoded.
// @route POST createEvent
// @desc creates an event and stores it in the database
router.post('/create', async (req, res) => {
  if(!req.body || !req.body.creator_id || !req.body.description || 
    !req.body.end_date || !req.body.max_applicants || !req.body.start_date || 
    !req.body.status || !req.body.title || !req.body.type) {
    res.send("Missing fields on request");
  } else {
    const newEventRef = eventsCollection.doc();
    const event = {
      applications: [],
      creator_id: req.body.creator_id,
      description: req.body.description,
      end_date: req.body.end_date,
      event_id: newEventRef.id,
      max_applicants: req.body.max_applicants,
      start_date: req.body.start_date,
      status: req.body.status,
      title: req.body.title,
      type: req.body.type     
    }

    // TODO: Like /applications/addToEvent
    // Should this be a separate route?
    const query = await eventsCollection.where(
      'user_id', '==', req.body.creator_id).get();
    let results = [];
    query.forEach(doc => {
      results = [...results, doc.data()];
    })
    results = results[0];
    results.user_events.push(newEventRef.id);
    usersCollection.doc(req.body.creator_id).set(results);

    await newEventRef.set(event).then(function() {
      console.log("Document written with ID: ", newEventRef.id);
      res.json(event);
    })
    .catch(function(error) {
      console.log("Error adding document", error);
      res.status(400).send(error);
    })


    // eventsCollection.doc().set(event);
    // .then(() => res.json(event));
  }
})


// @route GET getApplicants
// @desc Returns all of the applications for a given event_id
router.get('/getApplicants/:event_id', async (req, res) => {
  // Gets event object and the array of application_id's
  const query = await eventsCollection.doc(req.params.event_id).get();
  if(query.empty) {
    res.status(400).send('No such event was found');
  }
  data = query.data();
  
  // Maps each application_id in the user's applications array to the actual 
  // application object
  const applications = data.applications;
  console.log(applications);
  if (applications.empty) {
    res.send([]);
  }
  for (let i = 0; i < applications.length; i++) {
    const ref = await applyCollection.doc(applications[i]);
    const query = await ref.get();
    if (!query.exists) {
      res.status(400).send("Error. Application does not exist");
    }
    const data = query.data();
    console.log('198', data);
    applications[i] = data;
  }
  res.json(applications);
})


module.exports = router