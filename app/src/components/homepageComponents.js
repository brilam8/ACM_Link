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
import EventCard from '../components/eventCardComponent';
//import Cards from '@rmwc/card/styles';

function EventsArray() {

  const history = useHistory();
  const [VideoGames, setVideoGames] = useState([]);
  const [HW, setHW] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [MISC, setMISC] = useState([]);

  async function fetchVideoUsers() {
    const response = await fetch('/events/homepage/videogames');
    const json = await response.json();
    console.log(json);
    setVideoGames(VideoGames.concat(json));
  } 

  async function fetchHWUsers() {
    const response = await fetch('/events/homepage/homework');
    const json = await response.json();
    console.log(json);
    setHW(HW.concat(json));
  }

  async function fetchProjectUsers() {
    const response = await fetch('/events/homepage/projects');
    const json = await response.json();
    console.log(json);
    setProjects(Projects.concat(json));
  }

  async function fetchMiscUsers() {
    const response = await fetch('/events/homepage/misc');
    const json = await response.json();
    console.log(json);
    setMISC(MISC.concat(json));
  }

  useEffect(()=>{
    fetchVideoUsers();
    fetchHWUsers();
    fetchProjectUsers();
    fetchMiscUsers();
  }, []);
  
  return (
    <div>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Videogames</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {VideoGames.map((user) => {
                return (
                    <EventCard
                        user_id= {user.creator_id}        
                        event_id= {user.event_id}
                    />
                );
            })}
        </div>
        <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Homework</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {HW.map((user) => {
                return (
                    <EventCard
                        user_id= {user.creator_id}        
                        event_id= {user.event_id}
                    />
                );
            })}
        </div>
        <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Projects</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {Projects.map((user) => {
                return (
                    <EventCard
                        user_id= {user.creator_id}        
                        event_id= {user.event_id}
                    />
                );
            })}
        </div>
        <br/>
        <Typography style = {{margin: "2.5% 0% 2.5% 4%"}} use="headline3">Misc</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {MISC.map((user) => {
                return (
                    <EventCard
                        user_id= {user.creator_id}        
                        event_id= {user.event_id}
                    />
                );
            })}
        </div>
    </div>
  );
  
}

export default EventsArray;