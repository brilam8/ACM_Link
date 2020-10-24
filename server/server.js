const express = require('express');
const fetch = require('node-fetch');
const app = express();
const users = require('./functions/users');

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

const port = 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})