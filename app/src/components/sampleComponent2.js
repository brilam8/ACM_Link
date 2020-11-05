import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'
import styled from 'styled-components';

//coding default html elements
const Div = styled.div`
  margin-left: 50px;
  color: red;
`;

//changing styles for rmwc
const TextfieldStyled = styled(Textfield)`
  width: 80%;
`

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
      <Div>
        <TextfieldStyled value={input} label="Outlined" onChange={e=>setInput(e.target.value)}/>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Div>
      <Div>
        <Typography>
          text entered: {inputSubmit}
        </Typography>
      </Div>
      <Divider/>
      <Div>
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
      </Div>
    </div>
  );
}

export default SampleAPI2;