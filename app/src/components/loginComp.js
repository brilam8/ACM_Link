import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Typography} from '@rmwc/typography';
import firebase from '../firebase';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

function LoginComp() {

  const [emailInput, setEmailInput] = useState('example@ucsd.edu');
  const [passInput, setPassInput] = useState('hunter123');
  const [loginStatus, setLoginStatus] = useState('No login status');
  const [output, setOutput] = useState([]);
  const [users, setUsers] = useState([]);

  function handleLogin () {
    if (emailInput.length > 0 & passInput.length > 0) {
      if (passInput.length > 7) {
        setLoginStatus("Logging in");
        firebase.auth().signInWithEmailAndPassword(emailInput, passInput)
        .then(() => {
          console.log("Signed in as user!")
          setLoginStatus("Logged in!")
        })
        .catch(function(error) {
          setLoginStatus("login error: " + error.code + " - " + error.message)
        });
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
      setLoginStatus("sign out error: " + error.code + " - " + error.message)
    })
  }

  async function grabUsers () {
    if (firebase.auth().currentUser) {
      const idToken = await firebase.auth().currentUser.getIdToken(true)
      .catch((error) => {
        setLoginStatus("Error getting auth token")
      });
      fetch('/users',{
        method: 'GET',
        headers: {"Content-Type": "application/json", "AuthToken" : idToken}
      })
      .then(function(response){
        return response.json()
      }).then(function(body){
        console.log(body);
        setUsers(body);
      });
    }
    else {
      setUsers([])
      fetch('/users',{
        method: 'GET'
      }).then(function(res) {      
        console.log(res.stringify)  
        return res.text();
      }).then(function(body){
        console.log(body);
        setLoginStatus(body);
      }).catch((error) => {
        setLoginStatus("Error grabbing users: " + error.code + " - " + error.message)
      })
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