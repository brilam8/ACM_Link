import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button'

function SampleAPI() {
  const [customerName, setCustomerName] = useState('');


  async function fetchURL() {
    const response = await fetch('/api/customers');
    const json = await response.json();
    console.log(json);
    setCustomerName(`${json.firstName} ${json.lastName}`);
  }

  useEffect(()=>{
    fetchURL();
  }, []);

  async function handleClick() {
    const data = {
      firstName: 'Julie',
      lastName: 'Ngan',
      email: 'JulieNgan@ucsd.edu',
      password: 'password'
    }
    fetch('/users/create',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(function(response){
      return response.json()
    }).then(function(body){
      console.log(body);
    });
  }

  return (
    <div className="SampleAPI">
      Hello {customerName}
      <Button onClick={()=>handleClick()}>Post Data</Button>
    </div>
  );
}

export default SampleAPI;