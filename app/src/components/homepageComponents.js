import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'; 
import {Typography} from "@rmwc/typography";
//import Cards from '@rmwc/card/styles';

function EventsArray() {

  const [buttons, setButtons] = useState([]);

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
        <Typography use="headline3">Video Game</Typography>
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
        <Typography use="headline3">Homework</Typography>
        <Typography use="headline3">Projects</Typography>
        <Typography use="headline3">Other</Typography>
    </div>
  );
  
}

export default EventsArray;