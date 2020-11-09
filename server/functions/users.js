const express = require('express');
const router = express.Router()
const { json } = require('express');
const {db, admin} = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const userCollection = db.collection("users")

// @route POST user
// @desc Creates a user object and stores it in the "users" collection in firestore
router.post('/create', async (req, res) => {
  if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
    res.send("Missing fields on request")
  }
  else {
    //console.log(req.body)
     // Generate a reference to a doc with unique ID

    admin.auth().createUser({
      email: req.body.email,
      disabled: false,
      password: req.body.password
    })
    .then(function(userRecord){
      const newUserRef = userCollection.doc(userRecord.uid)
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        user_id: userRecord.uid,
        user_events: []
      }

      newUserRef.set(user)
      .then(function(){
        console.log("Successfully created a new user: ", userRecord.uid);
        res.json(userRecord);
      })
      .catch(function(error) {
        console.error("Error adding user document: ", error)
        res.status(400).send(error)
      })
    })
    .catch(function(error){
      console.log("Error creating a new user: ", error);
      res.status(400).send(error);
    });
  }
})

// @route GET user
// @desc returns a user object from the "users" collection in firestore given an id
router.get('/:userId', async (req, res) => {
  
  console.log(req.params)
  if (!req.params.userId) res.status(400).send("No user id provided");
  
  const userRef = await userCollection.doc(req.params.userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(400).send("No such user document exists");
  }
  else {
    res.json(doc.data());
  }
})

// @route GET user(s)
// @desc returns user object(s) from the "users" collection in firestore given query (or queries)
router.get('/', async (req, res) => {
  let queryResults = await userCollection.get();
  let results = [];
  queryResults.forEach(doc => {
    results.push(doc.data())
  })
  res.json(results);
})

module.exports = router