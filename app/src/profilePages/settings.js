import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield'
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import { IconButton } from '@rmwc/icon-button'
import '@rmwc/snackbar/styles'
import "typeface-roboto";
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import '@rmwc/icon-button/styles';
import firebase from '../firebase';
import avatar1 from "../images/avatar-1.png"
import avatar2 from "../images/avatar-2.png"

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

const AvatarDiv = styled.div`
  height: 60%;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
  margin-bottom: 4%;
`

const StyledButton = styled(Button)`
  && {
    background-color: #333333;
  }
`

function Settings() {

  const defaultValues = {
    FirstNameTextField: "",
    LastNameTextField: "",
    PasswordTextField: ""
  }
  const {register, handleSubmit, reset, control, errors, setValue} = useForm({defaultValues});
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [snackMessage, setMessage] = useState("An error occurred");
  const [revealPassword, setReveal] = useState(false);
  const [origFirstName, setOrigFirstName] = useState('');
  const [origLastName, setOrigLastName] = useState('');
  const [avatarType, setAvatarType] = useState(true);
  

  // Toggles whether or not you can visibly see the password.
  function toggleReveal() {
    setReveal(!revealPassword);
  }

  function handleLogout () {
    firebase.auth().signOut().then(function(){
      setOpen(false);
      history.push('/login')
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  function toggleReveal() {
    setReveal(!revealPassword);
  }

  async function toggleAvatar () {
    const currUser = firebase.auth().currentUser;
    if (currUser) {
      setAvatarType(!avatarType);
      const idToken = await firebase.auth().currentUser.getIdToken(true)
      let res = await fetch(`/users/updateIcon/${currUser.uid}`,{
        method: 'PUT',
        body: JSON.stringify({avatar_type: !avatarType}),
        headers: {"Content-Type": "application/json", "AuthToken" : idToken}
      })
      if (res.ok){
        setMessage("Update successful!");
        setOpen(true);
      }
    }
  }

  async function saveInfo(data) {
    const currUser = firebase.auth().currentUser;
    if (currUser) {
      const pass = data.PasswordTextField;
      const userData = {
        firstName: data.FirstNameTextField,
        lastName: data.LastNameTextField,
      }
      console.log(userData);
      if (pass !== "") {
        console.log("Updating password.");
        currUser.updatePassword(pass).then(async function() {
          setMessage("Update successful!");
          setOpen(true);
        }).catch(async function(error) {
          setMessage("An error occurred. Please re-authenticate to change your password!");
          setOpen(true);
          await new Promise(r => setTimeout(r, 3000));
          handleLogout();
        });
      }
      if (userData.firstName !== origFirstName || userData.lastName !== origLastName) {
        console.log("Updating name.");
        const idToken = await firebase.auth().currentUser.getIdToken(true)
        let res = await fetch(`/users/updateName/${currUser.uid}`,{
          method: 'PUT',
          body: JSON.stringify(userData),
          headers: {"Content-Type": "application/json", "AuthToken" : idToken}
        })
        if (res.ok){
          setMessage("Update successful!");
          setOrigFirstName(userData.firstName);
          setOrigLastName(userData.lastName);
          setOpen(true);
        }
      }
    }
  }
  
  useEffect(() => {
    async function grabUserInfo() {
      firebase.auth().onAuthStateChanged(async function(user) {
        if (user && origLastName == "" && origFirstName == "") {
          console.log("Grabbing user info!")
          const idToken = await firebase.auth().currentUser.getIdToken(true)
          .catch((error) => {
            console.log("Error getting auth token")
          });
          try {
            let res = await fetch(`/users/${user.uid}`,{
              method: 'GET',
              headers: {"Content-Type": "application/json", "AuthToken" : idToken}
            })
            res = await res.json();
            setValue("FirstNameTextField", res.firstName);
            setValue("LastNameTextField", res.lastName);
            setOrigFirstName(res.firstName);
            setOrigLastName(res.lastName);
            setAvatarType(res.avatar_type);
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
                rules={{pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,26}$/}} 
                control={control} 
                as={
                  <TextField 
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
          <AvatarDiv>
            <img style = {{ height: "70%", width: "70%"}}
              src={avatarType ? avatar1 : avatar2} 
              alt="avatar"
            />
            <IconButton
              icon="refresh"
              onClick={() => toggleAvatar()}
            />
          </AvatarDiv>
      </OuterDiv>
  )
}

export default Settings