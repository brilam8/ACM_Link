const express = require('express');
const router = express.Router()
const { json } = require('express');
const { app } = require('firebase');
const db = require('../firebase');
var cors = require('cors')
// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const userCollection = db.collection("events")
const groupCollection = db.collection("groups")

router.get('/', cors(), async (req, res) => {
    console.log("GET FUNCTION CALLED");
    const collection = await db.collection('events');
    let results = [];
    const events = await db 
      .collection('events')
      // .where('type', '==', "Game")
      .get();
    events.forEach(doc => {
        results = [...results, doc.data()]
    })

    res.json(results)
})
module.exports = router



