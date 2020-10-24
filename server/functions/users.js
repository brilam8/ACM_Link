const express = require('express');
const router = express.Router()
const { json } = require('express');
const db = require('../firebase');

// Configure app to use bodyParser
router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

const userCollection = db.collection("users")
const groupCollection = db.collection("groups")

// @route POST user
// @desc Creates a user object and stores it in the "users" collection in firestore
router.post('/create', async (req, res) => {
  if (!req.body | !req.body.firstName | !req.body.lastName | !req.body.email){
    res.send("Missing fields on request")
  }
  else {
    console.log(req.body)
    const newUserRef = userCollection.doc() // Generate a reference to a doc with unique ID
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      user_id: newUserRef.id
    }
    
    // Use the previous doc reference to update it with actual information
    newUserRef.set(user).then( function(){
      console.log("Document written with ID: ", newUserRef.id)
      res.json(user);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error)
      res.status(400).send(error)
    })
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
  let querySize = Object.keys(req.query).length; // Check size of queries

  // If no query, retrieve all user objects
  if (querySize == 0) {
    
    let queryResults = await userCollection.get();
    let results = [];
    queryResults.forEach(doc => {
      results.push(doc.data())
    })
    res.json(results);
  }
  // Else, search by query
  else {
  
    let queryResults;
    
    // Go through each query provided and search through database for them
    for (query in req.query) {
      console.log(req.query[query])
      queryResults = userCollection.orderBy(query).startAt(req.query[query]).endAt(req.query[query]+"\uf8ff")
    }
    queryResults = await queryResults.get();
    let results = []; 
    queryResults.forEach(doc => {
      results.push(doc.data())
    })
    res.json(results);
  
  }
})

module.exports = router