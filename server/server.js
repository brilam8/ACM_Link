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

//app.use('/users', checkAuth)
app.use('/users', users)
app.use('/events', events)
app.use('/applications', applications)

const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})