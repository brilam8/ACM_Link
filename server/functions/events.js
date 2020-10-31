const express = require('express');
const router = express.Router()
const { json } = require('express');
const {db, admin} = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.get('/getEvents', async (req, res) => {
  const eventscollection = db.collection('events').where("event_id", "==", "10000")
  const query = await eventscollection.get();

  //results are stored in an array
  let results = [];

  //for each firestore doc returned, store the data into the array
  query.forEach(doc=>{
    //same as results.push(doc.data())
    results = [...results, doc.data()]
  })
  console.log(results);
  res.json(results);
})

router.get('/setEvents', async (req, res) => {
  const eventscollection = db.collection('events').doc().set({event_id:"10000"})
  /*
  //results are stored in an array
  let results = [];

  //for each firestore doc returned, store the data into the array
  query.forEach(doc=>{
    //same as results.push(doc.data())
    results = [...results, doc.data()]
  })
  console.log(results);
  res.json(results);
  */
 res.json({label:"hi"})
})

module.exports = router