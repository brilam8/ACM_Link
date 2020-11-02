import React, { useState, useEffect } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { useParams } from 'react-router-dom';

import '@rmwc/textfield/styles';
import '@rmwc/button/styles';


// TODO: Prevent page reload if 

function ApplicationForm() {
  const params = useParams();
  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [whyInput, setWhyInput] = useState('');

  function handleSubmit(event) {
    if (descInput == '' || whyInput == '') {
      return;
    }
    event.preventDefault();
    const output = {
      desc: descInput,
      comments: commentInput,
      whyDesc: whyInput
    }

    fetchURL(output);
    console.log(output);
    window.location.reload(false);
  }

  async function fetchURL(output) {
    await fetch(`/applications/create/${params.UID}/${params.event_id}`, {
      method: "POST",
      body: JSON.stringify(output),
      headers: {"Content-Type":"application/json"}
    })
  }

  return (
    <div className='ApplicationForm' style={{'marginTop': '300px'}}>
      <form>
        <div style={{'display':'flex', 
          'justify-content':'space-around'}}>
          <TextField 
            label="Tell us a bit about yourself"
            required
            outlined
            style={{width: '50rem'}}
            onChange={e=>setDescInput(e.target.value)}/>
        </div>

        <div style={{'display':'flex', 
          'justify-content':'center',
          'marginTop':'50px'}}>
          <TextField 
            label='Why do you want to join us?'
            required
            outlined
            style={{width: '25rem', marginRight: '200px'}}
            onChange={e=>setWhyInput(e.target.value)}/>
          <TextField 
            label='Any extra comments?' 
            outlined
            style={{width: '25rem'}}
            onChange={e=>setCommentInput(e.target.value)}/>
        </div>

        <div style={
          {'display':'flex', 
          'justify-content': 'center', 
          'align-items': 'center', 
          'marginTop': '25px'}}>
          <Button onClick={event => handleSubmit(event)}>Submit</Button>
        </div>
      </form>

      <TextField
        textarea
        outlined
        label="textarea..."
        rows={3}
        maxLength={4}
        characterCount
        helpText={{
          persistent: true,
          validationMsg: true,
          children: 'The field is required'
        }}
      />
    </div>
  );
}


export default ApplicationForm;