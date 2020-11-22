import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import '@rmwc/snackbar/styles'
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import firebase from '../firebase';

const OuterDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 85vh;
  margin: auto;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #333333;
  }
`

function PasswordReset() {

  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("");

  /*
    Using firebase official methods, sends a password reset 
    email to the email provided within the text input.
  */
  async function sendPasswordReset() {
    try {
      let res = await firebase.auth().sendPasswordResetEmail(emailInput);
        setMessage("An email has been sent! Please check your email to reset your password.")
        setOpen(true);
        await new Promise(r => setTimeout(r, 2000));
        history.push("/login")
    }
    catch (error){
      setMessage("Error. Make sure you have an account under that email!")
      setOpen(true);
    }
  }

  return (
      <OuterDiv className = "ResetPass" >
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <Snackbar
          open={open}
          onClose={evt => setOpen(false)}
          message={snackMessage}
          dismissesOnAction
          action = {
            <SnackbarAction
              icon="close"
            />
          }
        />
        <Typography style = {{textAlign: 'center', marginBottom: '45px'}} use="headline2">Reset Password</Typography>
        <div style = {{width: "65%", alignSelf: 'center'}}>
          <TextField 
            value={emailInput} 
            onChange={e=>setEmailInput(e.target.value)} 
            pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" 
            style = {{width: "100%"}} 
            helpText={{
              persistent: false,
              validationMsg: true,
              children: 'You must use a UCSD email!'
            }} 
            label="Email" 
          />
        </div>
        <StyledButton raised
          onClick={()=> sendPasswordReset()} 
          style = {{width: "30%", marginTop: "15px", marginBottom: "22px"}} 
          label="Send Reset Email"
        />  
      </OuterDiv>
  )
}

export default PasswordReset