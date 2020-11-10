import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import '@rmwc/snackbar/styles'
import "typeface-roboto";
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import firebase from '../firebase';
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

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

const TextLink = styled(Link)`
  align-self: flex-start;
  text-decoration: none;
  color: #000000;
  font-family: Roboto;
`

function Login() {

  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("An error occurred");
  const [loginStatus, setLoginStatus] = useState('');
  const [revealPassword, setReveal] = useState(false);

  // Toggles whether or not you can visibly see the password.
  function toggleReveal() {
    setReveal(!revealPassword);
  }

  /*
    Given an email and password from the text inputs, attempts to log
    a user into the web application so that they can access the 
    rest of the application's functionality.
  */
  async function handleLogin () {
    const passLength = passInput.length;
    if (emailInput.length > 0 && passLength > 0) {
      if (passLength > 7) {
        setLoginStatus("Logging in");
        try {
          await firebase.auth().signInWithEmailAndPassword(emailInput, passInput)
          setMessage("Logged in! Please wait while you are redirected.")
          setOpen(true);
          setLoginStatus('Login success!')
          await new Promise(r => setTimeout(r, 4000));
          history.push("/homepage")
        } catch (error) {
          setLoginStatus('')
          setMessage("Error. Make sure you have an account under that email!")
          setOpen(true);
        }
        setEmailInput('');
        setPassInput('');
        setLoginStatus('')
      }
      else {
        setLoginStatus("Error: password length has to be 8 or more characters");
      }
    }
  }

  return (
      <OuterDiv className = "LoginPage" >
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"></link>
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
        <Typography style = {{textAlign: 'center', marginBottom: '45px'}} use="headline2">ACM Teammate Finder</Typography>
        <div style = {{width: "65%", alignSelf: 'center'}}>
          <TextField 
            pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" 
            style = {{width: "100%"}} 
            helpText={{
              persistent: false,
              validationMsg: true,
              children: 'You must use a UCSD email!'
            }} 
            value = {emailInput} 
            onChange={e=>setEmailInput(e.target.value)} 
            label="Email" 
          />
          <br/>
          <TextField 
            type={revealPassword ? "text" : "password"} 
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$" 
            style = {{width: "100%"}} 
            trailingIcon={revealPassword ? {
              icon: "visibility_off",
              tabIndex: 0,
              onClick: () => toggleReveal()
            } : {
              icon: 'visibility',
              tabIndex: 0,
              onClick: () => toggleReveal()
            }} 
            helpText={{
              persistent: false,
              validationMsg: true,
              children: 'Your password must be 8-26 characters long and contain a letter and number!'
            }}
            value={passInput} 
            onChange={e=>setPassInput(e.target.value)} 
            label="Password" 
          />
          <TextLink to="/resetPassword">Forgot password?</TextLink>
        </div>
        <Button raised
          onClick={() => handleLogin()} 
          style = {{width: "30%", marginTop: "30px"}}
          label="SIGN IN"  
        />  
        <Typography style = {{marginTop: '5px', marginBottom: "15px"}}>
          {loginStatus}
        </Typography>
        <Button raised
          onClick={() => history.push("/createAccount")} 
          style = {{width: "30%"}} 
          label="CREATE NEW ACCOUNT"  
        /> 
      </OuterDiv>
  )
}

export default Login