const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const app = express();

app.get('/api/customers', (req, res) => {
  const customers = 
    {
      id: 1, 
      firstName: 'Leland', 
      lastName: 'Long'
   }
  res.json(customers)
})

app.get('/api/data', async (req, res) => {
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
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

