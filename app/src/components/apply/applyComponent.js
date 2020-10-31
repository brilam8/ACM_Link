import React, { useEffect, useState } from 'react';
import './applyComponent.css';

/* ========== TODO ==========
1. don't know how to console log properly
2. margins for input elements
   ==========================
*/


function ApplyAPI() {

  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [inputSubmit, setInputSubmit] = useState([]);
  const [output, setOutput] = useState({});
  
  function handleSubmit() {
    // 1. console.log(descInput, " | ", commentInput);
    setInputSubmit([descInput, commentInput]);
    setOutput({ desc: descInput, comments: commentInput });
    // console.log(output);
    postToServer();
    setDescInput('');
    setCommentInput('');
  }

  async function fetchURL() {
    await fetch('/apply/send', {
      method: 'POST',
      body: JSON.stringify(output),
      headers: {"Content-Type": "application/json"}
    })
  }

  function postToServer() {
    fetchURL();
  }

  useEffect(() => {
    fetchURL();
  }, []);

  return (
    <div>
      <form>
        <div className='form'>
          <label>
            <div className='form-row'>
              {/* 2. How to add margins for elements */}
              <label>
                Description:
              </label>
              <input type='text' name='desc' onChange={e=>setDescInput(e.target.value)} required />
            </div>
            <div className='form-row'>
              <label>
                Comments:
              </label>
              <input type='text' name='comments' onChange={e=>setCommentInput(e.target.value)}/>
            </div>
          </label>
          </div>
        <button onClick={() => handleSubmit()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ApplyAPI;