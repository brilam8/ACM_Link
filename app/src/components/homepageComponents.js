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
//import Cards from '@rmwc/card/styles';

function EventsArray() {

  const history = useHistory();
  const [buttons, setButtons] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  

  async function fetchVideoUsers() {
    const response = await fetch('/events/api/videogames');
    const json = await response.json();
    console.log(json);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  async function fetchHWUsers() {
    const response = await fetch('/events/api/homework');
    const json = await response.json();
    console.log(json);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  async function fetchProjectUsers() {
    const response = await fetch('/events/api/projects');
    const json = await response.json();
    console.log(json);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  async function fetchMiscUsers() {
    const response = await fetch('/events/api/misc');
    const json = await response.json();
    console.log(json);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  useEffect(()=>{
    fetchVideoUsers();
    fetchHWUsers();
    fetchProjectUsers();
    fetchMiscUsers();
  }, []);
  
  return (
    <div>
        <TextField 
            //icon="search"
            //trailingIcon="close"
            style = {{
              width: "25%",
              margin: "2.5% 0% 2.5% 4%",
            
            }} 
            value = {emailInput}
            label="Search posts" 
        />
        <Button raised
           //onClick={() => history.push("/createAccount")} 
          style = {{
          width: "10%",
          margin: "0% 0% 0% 2.5%",
          float: "center",
          backgroungColor: "black"
          }} 
          label="SEARCH"
        /> 
        <Button raised
          onClick={() => history.push("/applicationPage/:UID/:event_id")} 
          style = {{
          width: "10%",
          margin: "3.25% 4% 0% 0%",
          float: "right",
          }}
          label="+ NEW POST"
        /> 
          <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Videogames</Typography>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    {user.max_applicants}
                    </Typography>
                );
            })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
        })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
            })}
        </div>
        <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Homework</Typography>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    {user.max_applicants}
                    </Typography>
                );
            })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
        })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
            })}
        </div>
        <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Projects</Typography>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    {user.max_applicants}
                    </Typography>
                );
            })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
        })}
        </div>
        <div>
            {buttons.map((user) => {
                return (
                    <Typography>
                    {user.event_id}
                    </Typography>
                );
            })}
        </div>
    </div>
  );
  
}

export default EventsArray;