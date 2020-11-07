import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'

function SampleAPI2() {

  const [input, setInput] = useState('');
  const [inputSubmit, setInputSubmit] = useState('');
  const [output, setOutput] = useState([])
  const [results, setResults] = useState('');

  //Submit function that fetches the data from getAllEvents CRUD function
  async function handleSubmit () {
    setInputSubmit(input);
    setOutput([...output, input]);
    setInput('');
    const results = await fetch("http://localhost:5000/events/getAllevents")
    const reader = new FileReader()
    reader.onload = async (results) => {
    const text = (results.target.result)
    }
    setResults((await results.text()));
  }
  return (
    <div className="SampleAPI2">
      <div style={{'marginLeft': '50px'}}>
        <Textfield value={input} label="Name of Event" onChange={e=>setInput(e.target.value)}/>
        <Button variant="contained" color="primary" onClick={ async () => {await handleSubmit();} }>
          Submit
        </Button>
      </div>
      <div style={{'marginLeft': '50px'}}>
        <Typography>
          Results: {results}
        </Typography>
      </div>
      <Divider/>
      <div style={{'marginLeft': '50px'}}>
        {
          output.map((text) => {
            return (
              <div>
                <Typography>
                  {text}
                </Typography>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default SampleAPI2;