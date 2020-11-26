const express = require('express');
const app = express();
const fetch = require('node-fetch');
const { db, admin } = require('./firebase');
const cors = require('cors');

// Routers
const users = require('./functions/users');
const events = require('./functions/events');
const applications = require('./functions/applications');

// Configure app to use bodyParser
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

app.get('/api/getCustomers/:postID/:userID', async (req, res) => {

  //gets all docs in users that has the search id match the param sent in
  const collection = await db.collection('users');
  const query = await collection.where("search_id", "==", req.params.postID).where("user_id", "==", req.params.userID).get();

  //results are stored in an array
  let results = [];

  //for each firestore doc returned, store the data into the array
  query.forEach(doc=>{
    //same as results.push(doc.data())
    results = [...results, doc.data()]
  })
  console.log(results)
  //return the data from firestore to the person loading the link
  res.json(results)
})

//get all the user routes from users.js
app.use('/users', users)
app.use('/events', events)
app.use('/applications', applications)

const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})