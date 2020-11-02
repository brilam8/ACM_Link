const express = require('express');
const router = express.Router()
const { json } = require('express');
const {db, admin} = require('../firebase');
const eventRoutes = require('./events');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const usersCollection = db.collection('users');
const applyCollection = db.collection('applications');
const eventsCollection = db.collection('events');



// @route POST addApplicant(event_id, application_id)
// @desc Adds an application to an event_id
router.post('/addToEvent', async (req,res) => {
  if (!req.body || !req.body.event_id || !req.application_id) {
    res.status(400).send("Missing fields on request");
  } else {
    // Adds application id to corresponding event in database
    const query = await eventsCollection.where(
      'event_id', '==', req.body.event_id).get();
    if (query.empty) {
      res.status(400).send('No such event found');
    }
    let results = [];
    query.forEach(doc => {
      results = [...results, doc.data()];
    })
    results = results[0];
    results.applications.push(application_id);
    eventsCollection.doc(req.body.event_id).set(results);
  }
})


// TODO: Should above method be nested in here?
// @route POST createApplication(event_id, applicant_id, description, comments)
// @desc Creates an application object and stores it in the 
//       "application" collection in firestore
router.post('/create', async (req, res) => {
  if (!req.body || !req.body.desc || 
      !req.body.applicant_id || !req.body.event_id) {
    res.status(400).send("Missing fields on request");
  } else {
    // Generates a reference to a doc with unique ID
    const newApplicationRef = applyCollection.doc();
    // Creates the application object
    const application = {
      app_id: newApplicationRef.id,
      applicant_id: req.body.applicant_id,
      event_id: req.body.event_id,
      comments: req.body.comments,
      desc: req.body.desc
    }

    // Updates application collection with a new document
    await newApplicationRef.set(application).then(function() {
      console.log("Document written with ID: ", newApplicationRef.id);
      res.json(application);
    })
    .catch(function(error) {
      console.error("Error adding document ", error);
      res.status(400).send(error);
    })
  }
});



// TODO:
// @route GET getApplication(user_id)
// @desc Returns the application of the clicked user
router.get('/getApplicant/:application_id', async (req,res) => {
  // Gets application object
  const applicationRef = await applyCollection.doc(req.params.application_id);
  const query = await applicationRef.get();
  let data;
  if (!query.exists) {
    res.status(400).send("No such application exists");
  } else {
    data = query.data();
  }

  // Returns user object
  const user_id = data.applicant_id;
  const response = await usersCollection.doc(user_id).get();
  res.json(response.data());
})



// @route GET getApplication(application_id)
// @desc Returns the application with the given id, or none if 
//       it doesn't exist
router.get('/:application_id', async (req, res) => {
  const applicationRef = await applyCollection.doc(req.params.application_id);
  const query = await applicationRef.get();
  if (!query.exists) {
    res.status(400).send("No such application exists");
  } else {
    res.json(query.data());
  }
})


// @route GET applications
// @desc Returns all applications in the database
router.get('/', async (req, res) => {
  let queryResults = await applyCollection.get();
  let results = [];
  queryResults.forEach(doc => {
    results = [...results, doc.data()];
  })
  res.json(results);
})


module.exports = router