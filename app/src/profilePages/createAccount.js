import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';
import { IconButton } from '@rmwc/icon-button'
import "typeface-roboto";
import '@rmwc/snackbar/styles'
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import '@rmwc/icon-button/styles';
import '@rmwc/radio/styles';
import styled from 'styled-components';

const defaultValues = {
  FirstNameTextField: "",
  LastNameTextField: "",
  EmailTextField: "",
  PasswordTextField: "",
  avatarTypeButton: true
}

const StyledButton = styled(Button)`
  && {
    background-color: #333333;
  }
`

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

function CreateAccount() {

  const {register, handleSubmit, reset, control, errors} = useForm({defaultValues});
  const history = useHistory();
  const [revealPassword, setRevealPassword] = useState(false)
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("");

  /*
    Given data from the text inputs, does a POST request to
    "/users/create," creating an account in Firebase with
    the corresponding user document.
  */
  async function createAccount(data) {    
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
        setMessage("Creation successful! Please wait while you are redirected.");
        setOpen(true);
        await new Promise(r => setTimeout(r, 4000));
        history.push("/login")
      }
      else{
        setMessage("An error occured. Maybe your email is already in use?");
        setOpen(true);
      }
      
    } catch (error){
      console.log(error);
    }
  }

  // Toggles whether or not you can visibly see the password.
  function toggleReveal() {
    setRevealPassword(!revealPassword);
  }


  return (
    
      <OuterDiv className = "CreateAccount" >
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
        <Typography style = {{textAlign: 'center', marginBottom: '45px'}} use="headline2">Account Creation</Typography>
        <div style = {{width: "65%", alignSelf: 'center'}}>
          <form onSubmit={handleSubmit(createAccount)} className="form">
              <Controller 
                name="FirstNameTextField" 
                rules={{required: true}} 
                control={control} 
                as={
                  <TextField required 
                    style = {{width: "100%"}} 
                    label="First Name"
                  />
                } 
              />
              <Controller 
                name="LastNameTextField" 
                rules={{required: true}} 
                control={control} 
                as={
                  <TextField required 
                    style = {{marginTop: '25px', width: "100%"}} 
                    label="Last Name" 
                  />
                }
              />
              <Controller 
                name="EmailTextField" 
                rules={{pattern: /\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b/, required: true}} 
                control={control} 
                as={
                  <TextField required 
                    pattern="\b[A-Za-z0-9._%+-]+@([Uu][Cc][Ss][Dd].[Ee][Dd][Uu])\b" 
                    style = {{marginTop: '25px', width: "100%"}} 
                    helpText={{
                      persistent: false,
                      validationMsg: true,
                      children: 'You must use a UCSD email!'
                    }} 
                    label="Email" 
                  />
                }
              />
              <Controller 
                name="PasswordTextField" 
                rules={{pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$/, required: true}} 
                control={control} 
                as={
                  <TextField required 
                    type={revealPassword ? "text" : "password"} 
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$" 
                    style = {{marginTop: '10px', width: "100%"}} 
                    trailingIcon={revealPassword ? 
                      {
                        icon: "visibility_off",
                        tabIndex: 0,
                        onClick: () => toggleReveal()
                      } : 
                      {
                        icon: 'visibility',
                        tabIndex: 0,
                        onClick: () => toggleReveal()
                      }} 
                    helpText={{
                      persistent: false,
                      validationMsg: true,
                      children: 'Your password must be 8-26 characters long and contain a letter and number!'
                    }}
                    label="Password" 
                  />
                } 
              />
              <StyledButton raised 
                className="button" 
                type="submit" 
                style = {{marginLeft:'15%', marginTop: '25px', width: "70%"}} 
                label="CREATE ACCOUNT"  
              /> 
            </form>
            
          </div>
      </OuterDiv>
  )
}

export default CreateAccount