import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"
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
import avatar from "../images/avatar1.png"
import { ListItemText } from '@material-ui/core';
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);



const OuterDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 92vh;
  width: 80vw;
  margin-left: 10vw;
`;

const StyledButton = styled(Button)`
  background-color: #333333;
`

function Settings() {

  const defaultValues = {
    FirstNameTextField: "",
    LastNameTextField: "",
    PasswordTextField: ""
  }
  const {register, handleSubmit, reset, control, errors, setValue} = useForm({defaultValues});
  const history = useHistory();
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("An error occurred");
  const [loginStatus, setLoginStatus] = useState('');
  const [revealPassword, setReveal] = useState(false);

  

  // Toggles whether or not you can visibly see the password.
  function toggleReveal() {
    setReveal(!revealPassword);
  }

  function saveInfo() {
    console.log("should save info");
  }
  
  useEffect(() => {
    async function grabUserInfo() {
      firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          console.log("Grabbing user info!")
          const idToken = await firebase.auth().currentUser.getIdToken(true)
          .catch((error) => {
            console.log("Error getting auth token")
          });
          try {
            /*let res = await fetch(`/users/${user.uid}`,{
              method: 'GET',
              headers: {"Content-Type": "application/json", "AuthToken" : idToken}
            })
            res = await res.json();*/
            res = {
              firstName: "LOL",
              lastName: "KEK"
            }
            setFirstNameInput(res.firstName);
            setLastNameInput(res.lastName);
          } catch(error) {
            console.log(`Error grabbing users: ${error.code} - ${error.message}`)
          }
        } 
      });
    }
    grabUserInfo();
  });

  return (
      <OuterDiv className = "SettingsPage" >
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
        <div style = {{width: "35%"}}>
          <form onSubmit={handleSubmit(saveInfo)} className="form">
              <Controller 
                name="FirstNameTextField" 
                rules={{required: true}} 
                control={control} 
                as={
                  <TextField required 
                    value = {firstNameInput}
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
                    style = {{marginTop: '45px', width: "100%"}} 
                    label="Last Name" 
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
                    style = {{marginTop: '50px', width: "100%"}} 
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
                style = {{marginLeft:'25%', marginTop: '3vh', width: "50%"}} 
                label="SAVE"  
              /> 
            </form>
          </div>
          <img style = {{marginLeft: "125px", marginBottom: "100px", height: "350px", width: "350px"}}src={avatar} alt="avatar"/>
      </OuterDiv>
  )
}

export default Settings