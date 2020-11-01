const express = require('express');
const app = express();
const fetch = require('node-fetch');
const { admin } = require('./firebase');
const cors = require('cors');
const users = require('./functions/users');

// Configure app to use bodyParser
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

//example API call
app.get('/api/customers', (req, res) => {
  const customers = {
    id: 1,
    firstName: 'Leland',
    lastName: 'Long'
  }
  res.json(customers)
})

function checkAuth(req, res, next){
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(403).send("Unauthorized")
    });
  }
  else {
    res.status(403).send("Unauthorized")
  }
}

//get all the user routes from users.js
app.use('/users', checkAuth)
app.use('/users', users)

const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})