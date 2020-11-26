import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '@rmwc/snackbar/styles'
import "typeface-roboto";
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import ListComponent from './homePageListComponent';

function EventsArray() {

  const [VideoGames, setVideoGames] = useState([]);
  const [HW, setHW] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [MISC, setMISC] = useState([]);

  async function fetchVideoUsers() {
    const response = await fetch('/events/homepage/games');
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
    const response = await fetch('/events/homepage/other');
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
      <ListComponent 
        title='Videogames'
        list={VideoGames}
      />

      <ListComponent
        title='Homework'
        list={HW}
      />

      <ListComponent
        title='Projects'
        list={Projects}
      />

      <ListComponent
        title='Other'
        list={MISC}
      />
    </div>
  );
  
}

export default EventsArray;