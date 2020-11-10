import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'; 
import {Typography} from "@rmwc/typography"

function ButtonArray() {
  
  const [buttons, setButtons] = useState([]);

  async function fetchUsers() {
    const response = await fetch('/events/api/videogames');
    const json = await response.json();
    console.log(json);
    //setButtons(buttons => [...buttons, json]);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  useEffect(()=>{
    fetchUsers();
  }, []);
  
  return (
    <div>
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

export default ButtonArray;