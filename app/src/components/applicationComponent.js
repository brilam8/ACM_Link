import React, { useState, useEffect } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { useParams } from 'react-router-dom';

import '@rmwc/textfield/styles';
import '@rmwc/button/styles';


function ApplicationForm() {
  const params = useParams();
  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  function handleSubmit() {
    const output = {
      desc: descInput,
      comments: commentInput,
      applicant_id: params.UID,
      event_id: params.event_id
    }

    fetchURL(output);
    console.log(output);
  }

  async function fetchURL(output) {
    await fetch('/apply/create', {
      method: "POST",
      body: JSON.stringify(output),
      headers: {"Content-Type":"application/json"}
    })
  }

  return (
    <div className='ApplicationForm' style={{'marginLeft': '50px', 'marginTop': '25px'}}>
      <div>
        <TextField placeholder='description...' onChange={e=>setDescInput(e.target.value)}/>
      </div>
      <div style={{'marginTop': '25px'}}>
        <TextField placeholder='comments...' onChange={e=>setCommentInput(e.target.value)}/>
      </div>
      <div style={{'marginTop': '25px'}}>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </div>
    </div>
  );
}


export default ApplicationForm;