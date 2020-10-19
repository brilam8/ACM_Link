import React, {useEffect, useState} from 'react';

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

  return (
    <div className="SampleAPI">
      Hello {customerName}
    </div>
  );
}

export default SampleAPI;