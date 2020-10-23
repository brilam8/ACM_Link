const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const app = express();
const firebase = require("firebase/app");
const { json } = require('express');

const firebaseConfig = {
  apiKey: "AIzaSyCnpmFxTTaEFuGu-DweMM3sQFH1v_xT7TE",
  authDomain: "teammate-finder-b5bd4.firebaseapp.com",
  databaseURL: "https://teammate-finder-b5bd4.firebaseio.com",
  projectId: "teammate-finder-b5bd4",
  storageBucket: "teammate-finder-b5bd4.appspot.com",
  messagingSenderId: "1047193842414",
  appId: "1:1047193842414:web:f7274429d193a41acd39ff",
  measurementId: "G-T3V4P54TTX"
};

// Firebase products
require("firebase/auth");
require("firebase/firestore");

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Configure app to use bodyParser
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


const userCollection = db.collection("users")
const groupCollection = db.collection("groups")

// @route POST user
// @desc Creates a user object and stores it in the "users" collection in firestore
app.post('/api/users/create', async (req, res) => {
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
app.get('/api/users/:userId', async (req, res) => {
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
app.get('/api/users', async (req, res) => {
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

app.get('/api/customers', (req, res) => {
  const customers = {
    id: 1,
    firstName: 'Leland',
    lastName: 'Long'
  }
  res.json(customers)
})

app.get('/api/data', async(req, res) => {
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&client_id=CZdcZyqa0Qw0EClPLTpi6YaPs5ZyCDK4UlcsM2D9cOnBjIaOo4&client_secret=oCKXh8sBK7aj8swlHbeVRycy37XDaldPAWF1cX8U'
  });
  const data = await response.json();
  console.log(data);
  res.json(data);
})


const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})