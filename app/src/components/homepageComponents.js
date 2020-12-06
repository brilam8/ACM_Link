import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import '@rmwc/snackbar/styles'
import "typeface-roboto";
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/textfield/styles';
import '@rmwc/icon/styles';
import ListComponent from './homePageListComponent';

const StyledButton = styled(Button)`
  && {
    background-color: #333333;
  }
`;

function EventsArray() {

  const [games, setGames] = useState([]);
  const [HW, setHW] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [other, setOther] = useState([]);
  const history = useHistory();

  async function fetchGameUsers() {
    const response = await fetch('/events/homepage/games');
    const json = await response.json();
    console.log(json);
    setGames(games.concat(json));
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

  async function fetchOtherUsers() {
    const response = await fetch('/events/homepage/other');
    const json = await response.json();
    console.log(json);
    setOther(other.concat(json));
  }

  useEffect(()=>{
    fetchGameUsers();
    fetchHWUsers();
    fetchProjectUsers();
    fetchOtherUsers();
  }, []);
  
  return (
    <div>
      <StyledButton raised
          theme={['secondaryBg', 'onSecondary']}
          onClick={() => history.push("/search")} 
          style = {{align: "center", width: "20%", marginTop: "30px", marginLeft: "25%", marginRight: "12%"}}
          label="SEARCH POSTS"  
      />
      <StyledButton raised
          theme={['secondaryBg', 'onSecondary']}
          onClick={() => history.push("/createEvent")} 
          style = {{align: "center", width: "20%", marginTop: "30px"}}
          label="+ NEW POST"  
      />

      <ListComponent 
        title='Games'
        list={games}
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
        list={other}
      />
    </div>
  );
  
}

export default EventsArray;