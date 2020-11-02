import React, {useEffect, useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Typography} from '@rmwc/typography';
import firebase from '../firebase';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function GrabUsers() {

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('No status');

  async function userGrab () {
    if (firebase.auth().currentUser) {
      const idToken = await firebase.auth().currentUser.getIdToken(true)
      .catch((error) => {
        setStatus("Error getting auth token")
      });
      try {
        const res = await fetch('/users',{
          method: 'GET',
          headers: {"Content-Type": "application/json", "AuthToken" : idToken}
        })
        setUsers(await res.json())
      } catch(error) {
        setStatus(`Error grabbing users: ${error.code} - ${error.message}`)
        setUsers([]);
      }
    }
    else {
      setUsers([])
      try {
        const res = await fetch('/users', {
          method: 'GET'
        })
        setStatus(await res.text())
      }
      catch (error) {
        setStatus(`Error grabbing users: ${error.code} - ${error.message}`)
      }
    }
  }

  return (
    <div className="grabUsers">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Typography>
          {status}
        </Typography>
      </div>
      <div style={{'marginTop': '50px', 'marginLeft' : '50px'}}>
        <Button variant="contained" color="primary" onClick={() => userGrab()}>
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

export default GrabUsers;