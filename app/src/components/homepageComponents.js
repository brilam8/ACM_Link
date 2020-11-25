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
    //fetchVideoUsers();
    fetchHWUsers();
    //fetchProjectUsers();
    //fetchMiscUsers();
  }, []);
  
  return (
    <div>
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
    </div>
  );
  
}

export default EventsArray;