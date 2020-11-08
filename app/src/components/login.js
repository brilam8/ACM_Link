import React, {useEffect, useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import {Typography} from '@rmwc/typography';
import {Button} from '@rmwc/button';
import {TextField} from '@rmwc/textfield'
import {Snackbar, SnackbarAction} from '@rmwc/snackbar'
import '@rmwc/snackbar/styles'
import "typeface-roboto";
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import firebase from '../firebase';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

function Login() {

  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("An error occurred");
  const [loginStatus, setLoginStatus] = useState('');
  const [revealPassword, setReveal] = useState(false)

  function toggleReveal() {
    setReveal(!revealPassword);
  }

  async function handleLogin () {
    console.log(emailInput)
    console.log(passInput)
    if (emailInput.length > 0 & passInput.length > 0) {
      if (passInput.length > 7) {
        setLoginStatus("Logging in");
        try {
          await firebase.auth().signInWithEmailAndPassword(emailInput, passInput)
          setMessage("Logged in! Please wait while you are redirected.")
          setOpen(true);
          setLoginStatus('Login success!')
          await new Promise(r => setTimeout(r, 4000));
          history.push("/loginTest")
          
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
    
      <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '85vh', margin: "auto"}} className = "LoginPage" >
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
          <TextField pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" style = {{width: "100%"}} 
          helpText={{
            persistent: false,
            validationMsg: true,
            children: 'You must use a UCSD email!'
          }} value = {emailInput} onChange={e=>setEmailInput(e.target.value)} label="Email" />
          
          <br></br>

          <TextField type={revealPassword ? "text" : "password"} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$" style = {{width: "100%"}} trailingIcon={revealPassword ? {
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
          value={passInput} onChange={e=>setPassInput(e.target.value)} label="Password" />
          <Link style={{alignSelf: 'flex-start', textDecoration: 'none', color: '#000000', fontFamily: 'Roboto'}} to="/resetPassword">Forgot password?</Link>
        </div>
        
        

        <Button onClick={() => handleLogin()} style = {{width: "30%", marginTop: "30px"}}label="SIGN IN" raised />  
        <Typography style = {{marginTop: '5px', marginBottom: "15px"}}>
          {loginStatus}
        </Typography>
        <Button onClick={() => history.push("/createAccount")} style = {{width: "30%"}} label="CREATE NEW ACCOUNT" raised /> 
        
      </div>
  )
}

export default Login