import React, {useState} from 'react';
import {useHistory } from 'react-router-dom';
import {useForm, Controller} from "react-hook-form"
import {Typography} from '@rmwc/typography';
import {Button} from '@rmwc/button';
import {TextField} from '@rmwc/textfield'
import {Snackbar, SnackbarAction} from '@rmwc/snackbar'
import "typeface-roboto";
import '@rmwc/snackbar/styles'
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import firebase from '../firebase';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const defaultValues = {
  FirstNameTextField: "Brian",
  LastNameTextField: "Lam",
  EmailTextField: "bqlam@ucsd.edu",
  PasswordTextField: "hunter13215125124"
}

function CreateAccount() {

  const {register, handleSubmit, reset, control, errors} = useForm({defaultValues});
  const history = useHistory();
  const [revealPassword, setReveal] = useState(false)
  const [open, setOpen] = useState(false);


  async function createAccount(data) {
    console.log(JSON.stringify(data))
    
    const userData = {
      firstName: data.FirstNameTextField,
      lastName: data.LastNameTextField,
      email: data.EmailTextField,
      password: data.PasswordTextField
    }
    try {
      let res = await fetch('/users/create',{
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {"Content-Type": "application/json"}
      })
      if (res.ok){
        history.replace("/login")
      }
      else{
        setOpen(true);
      }
      
    } catch (error){
      console.log(error);
    }
  }

  function toggleReveal() {
    setReveal(!revealPassword);
  }


  return (
    
      <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '85vh', margin: "auto"}} className = "LoginPage" >
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <Snackbar
          open={open}
          onClose={evt => setOpen(false)}
          message="An error occured. Maybe your email is already in use?"
          dismissesOnAction
          action = {
            <SnackbarAction
              icon="close"
            />
          }
        />
        <Typography style = {{textAlign: 'center', marginBottom: '45px'}} use="headline2">Account Creation</Typography>
        <div style = {{width: "65%", alignSelf: 'center'}}>
          <form onSubmit={handleSubmit(createAccount)} className="form">
              <Controller name="FirstNameTextField" rules={{required: true}} control={control} as=
                {<TextField required style = {{width: "100%"}} label="First Name"/>} />

              <Controller name="LastNameTextField" rules={{required: true}} control={control} as=
                {<TextField required style = {{marginTop: '25px', width: "100%"}} label="Last Name" />} />

              <Controller name="EmailTextField" rules={{pattern: /\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b/, required: true}} control={control} as=
              {<TextField required pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" style = {{marginTop: '25px', width: "100%"}} helpText={{
                persistent: false,
                validationMsg: true,
                children: 'You must use a UCSD email!'
              }} label="Email" />} />
              
              <Controller name="PasswordTextField" rules={{pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$/, required: true}} control={control}  as=
              {<TextField required type={revealPassword ? "text" : "password"} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$" style = {{marginTop: '10px', width: "100%"}} trailingIcon={revealPassword ? {
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
              label="Password" />} 
              />
              <Button className="button" type="submit" style = {{marginLeft:'15%',marginTop: '25px', width: "70%"}} label="CREATE ACCOUNT" raised /> 
            </form>
          </div>
        
      </div>
  )
}

export default CreateAccount