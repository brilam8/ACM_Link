const express = require('express');
const fetch = require('node-fetch');
const app = express();
const users = require('./functions/users');
const events = require('./functions/events');
// Configure app to use bodyParser
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//example API call
app.get('/api/customers', (req, res) => {
  const customers = {
    id: 1,
    firstName: 'Leland',
    lastName: 'Long'
  }
  res.json(customers)
})

//get all the user routes from users.js
app.use('/users', users)
app.use('/events', events)
const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})