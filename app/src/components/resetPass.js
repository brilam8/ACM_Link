import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Typography} from '@rmwc/typography';
import {Button} from '@rmwc/button';
import {TextField} from '@rmwc/textfield'
import {Snackbar, SnackbarAction} from '@rmwc/snackbar'
import '@rmwc/snackbar/styles'
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import firebase from '../firebase';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

function PasswordReset() {

  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("");

  async function sendPasswordReset() {
    try {
      
      let res = await firebase.auth().sendPasswordResetEmail(emailInput);
      
        console.log("Email sent!")
        setMessage("An email has been sent! Please check your email to reset your password.")
        setOpen(true);
        
        await new Promise(r => setTimeout(r, 4000));
        history.replace("/login")
        
    }
    catch (error){
      setMessage("Error. Make sure you have an account under that email!")
      setOpen(true);
      
      console.log(error);
    }
  }

  return (
    
      <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '85vh', margin: "auto"}} className = "LoginPage" >
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
          <TextField value={emailInput} onChange={e=>setEmailInput(e.target.value)} pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" style = {{width: "100%"}} 
          helpText={{
            persistent: false,
            validationMsg: true,
            children: 'You must use a UCSD email!'
          }} label="Email" />
          
        </div>
        
        <Button onClick={()=> sendPasswordReset()} style = {{width: "30%", marginTop: "15px", marginBottom: "22px"}} label="Send Reset Email" raised />  
      </div>
  )
}

export default PasswordReset