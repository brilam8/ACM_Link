const express = require('express');
const router = express.Router();
const { json } = require('express');
const db = require('../firebase.js');

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const applyCollection = db.collection("applications");


// @route POST application
// @desc Creates an application object and stores it in the 
//       "application" collection in firestore
router.post('/send', async (req, res) => {
  if (!req.body | !req.body.desc) {
    console.log(req.body);
    console.log("here2 " + req.body.desc);
    res.send("Missing fields on request");
  } else {
    console.log(req.body);
    // Generates a reference to a doc with unique ID
    const newApplicationRef = applyCollection.doc();
    const application = {
      app_id: newApplicationRef.id,
      applicant_id: req.body.applicant_id,
      event_id: req.body.event_id,
      comments: req.body.comments,
      desc: req.body.desc
    }

    // Use the previously generated reference to update it
    // with actual data
    newApplicationRef.set(application).then(function() {
      console.log("Document written with ID: ", newApplicationRef.id);
      res.json(application);
    })
    .catch(function(error) {
      console.error("Error adding document ", error);
      res.status(400).send(error);
    })
  }
});


// @route GET application with id
// @desc returns the application with the given id, or none if 
//       it doesn't exist
router.get('/:application_id', async (req, res) => {
  console.log(req.params);
  if (!req.params.application_id) {
    res.status(400).send("No application id specified");
  }

  const applicationRef = await applyCollection.doc(req.params.application_id);
  const query = await applicationRef.get();
  if (!query.exists) {
    res.status(400).send("No such application exists");
  } else {
    res.json(query.data());
  }
})



// TODO Not sure how to add query length

// @route GET applications
// @desc returns all applications in the database
router.get('/', async (req, res) => {
  let queryResults = await applyCollection.get();
  let results = [];
  queryResults.forEach(doc => {
    results = [...results, doc.data()];
  })
  res.json(results);
})


module.exports = router;