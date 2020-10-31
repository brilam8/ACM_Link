import React, { useEffect, useState } from 'react';
import {Button} from '@rmwc/button';
import {TextField} from '@rmwc/textfield';
//import './applyComponent.css';

/* ========== TODO ==========
1. don't know how to console log properly
2. margins for input elements
   ==========================
*/


function ApplyAPI() {

  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  
  function handleSubmit() {
    // 1. console.log(descInput, " | ", commentInput);
    const output = {
      desc: descInput,
      comments: commentInput,
      applicant_id: 'req.body.applicant_id',
      event_id: 'req.body.event_id',
    }
    fetchURL(output);
    console.log(output)
    //setDescInput('');
    //setCommentInput('');
  }

  
  async function fetchURL(output) {
    await fetch('/apply/send', {
      method: 'POST',
      body: JSON.stringify(output),
      headers: {"Content-Type": "application/json"}
    })
  }

  /*
  useEffect(() => {
    //fetchURL();
  }, []);
  */

  return (
    <div>
      <TextField placeholder='description...' onChange={e=>setDescInput(e.target.value)}>

      </TextField>
      <TextField placeholder='comments...' onChange={e=>setCommentInput(e.target.value)}>
      
      </TextField>
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </div>
  );
}

export default ApplyAPI;