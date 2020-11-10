import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Typography} from '@rmwc/typography';
import firebase from '../firebase';
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function LoginComp() {

  const [emailInput, setEmailInput] = useState('example@ucsd.edu');
  const [passInput, setPassInput] = useState('hunter123');
  const [loginStatus, setLoginStatus] = useState('No login status');
  const [output, setOutput] = useState([]);
  const [users, setUsers] = useState([]);

  async function handleLogin () {
    if (emailInput.length > 0 & passInput.length > 0) {
      if (passInput.length > 7) {
        setLoginStatus("Logging in");
        try {
          await firebase.auth().signInWithEmailAndPassword(emailInput, passInput)
          setLoginStatus("Logged in!")
        } catch (error) {
          setLoginStatus(`login error: ${error.code} - ${error.message}`)
        }
        setOutput([...output, [emailInput, passInput]]);
        setEmailInput('');
        setPassInput('');  
      }
      else {
        setLoginStatus("Error: password length has to be 8 or more characters");
      }
    }
  }

  function handleLogout () {
    firebase.auth().signOut().then(function(){
      setLoginStatus("Signed out!")
    })
    .catch(function(error) {
      setLoginStatus(`Sign out error: ${error.code} - ${error.message}`)
      setUsers([]);
    })
  }

  async function grabUsers () {
    if (firebase.auth().currentUser) {
      const idToken = await firebase.auth().currentUser.getIdToken(true)
      .catch((error) => {
        setLoginStatus("Error getting auth token")
      });
      console.log(idToken);
      try {
        const res = await fetch('/users',{
          method: 'GET',
          headers: {"Content-Type": "application/json", "AuthToken" : idToken}
        })
        setUsers(await res.json())
      } catch(error) {
        setLoginStatus(`Error grabbing users: ${error.code} - ${error.message}`)
        setUsers([]);
      }
    }
    else {
      setUsers([])
      try {
        const res = await fetch('/users', {
          method: 'GET'
        })
        setLoginStatus(await res.text())
      }
      catch (error) {
        setLoginStatus(`Error grabbing users: ${error.code} - ${error.message}`)
      }
    }
  }

  return (
    <div className="LoginComp">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Typography>
          {loginStatus}
        </Typography>
      </div>
      <div style={{'marginLeft': '50px'}}>
        <Textfield value={emailInput} label="Email" onChange={e=>setEmailInput(e.target.value)}/>
        <Textfield value={passInput} label="Password" onChange={e=>setPassInput(e.target.value)}/>
        <Button variant="contained" color="primary" onClick={() => handleLogin()}>
          Login
        </Button>
      </div>
      
      <Divider/>
      <div id="display-logins" style={{'marginLeft': '50px'}}>
        {
          output.map((subarr) => {
            return (
              <div>
                <Typography>
                  Email: {subarr[0]}, Pass: {subarr[1]}
                </Typography>
              </div>
            )
          })
        }
      </div>
      <div style={{'marginTop': '50px', 'marginLeft' : '50px'}}>
        <Button variant="contained" color="primary" onClick={() => handleLogout()}>
          Sign Out
        </Button>
      </div>
      <div style={{'marginTop': '50px', 'marginLeft' : '50px'}}>
        <Button variant="contained" color="primary" onClick={() => grabUsers()}>
          Grab users
        </Button>
      </div>
      <div id="display-users" style={{'marginLeft': '50px'}}>
        {
          users.map((user) => {
            return (
              <div>
                <Typography>
                  {JSON.stringify(user)}
                </Typography>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default LoginComp;