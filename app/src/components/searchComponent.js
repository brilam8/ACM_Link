import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'

function SampleAPI2() {

  const [input, setInput] = useState('');
  const [inputSubmit, setInputSubmit] = useState('');
  const [output, setOutput] = useState([])

  function handleSubmit () {
    setInputSubmit(input);
    setOutput([...output, input]);
    setInput('');
  }

  return (
    <div className="SampleAPI2">
      <div style={{'marginLeft': '50px'}}>
        <Textfield value={input} label="Outlined" onChange={e=>setInput(e.target.value)}/>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
      <div style={{'marginLeft': '50px'}}>
        <Typography>
          text entered: {inputSubmit}
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