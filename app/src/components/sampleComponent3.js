import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'; 
import {Typography} from "@rmwc/typography"

function ButtonArray() {
  
  const [buttons, setButtons] = useState([]);
  const [appButtons, setAppButtons] = useState([]);

  async function fetchUsers() {
    const response = await fetch('/events/api/videogames');
    const json = await response.json();
    console.log(json);
    //setButtons(buttons => [...buttons, json]);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  async function fetchEventApps() {
    const response = await fetch('/events');
    const json = await response.json();
    console.log(json);
    setAppButtons(appButtons.concat(json));
    console.log(appButtons);
  }

  useEffect(()=>{
    fetchUsers();
    fetchEventApps();
  }, []);
  
  return (
    <div>
      <div>
        {buttons.map((user) => (
            <Link to={`/buttonPage/${user.user_id}/${user.firstName}`}>
              <Button>
                {user.firstName}
              </Button>
            </Link>
          ))}
      </div>

      {/* TODO: event.creator_id IS WRONG. It should be the id of the current
      logged-in user. WE WILL NEED TO FIX THIS LATER. */}
      <div>
        {appButtons.map((event) => (
            <Link to={`/applicationPage/${event.creator_id}/${event.event_id}`}>
              <Button>
                {event.title}
              </Button>
            </Link>
        ))}
      </div>
    </div>
  ); 
}

export default ButtonArray;