import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Typography } from '@rmwc/typography';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
} from '@rmwc/card';

import '@rmwc/card/styles';

const imageMap = {
  'GAMES': ,
  'PROJECTS': ,
  'HOMEWORK': 
}

function ButtonArray() {
  
  const [buttons, setButtons] = useState([]);
  const [appButtons, setAppButtons] = useState([]);

  async function fetchUsers() {
    const response = await fetch('/users');
    const json = await response.json();
    console.log(json);
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
      <link 
        href="https://fonts.googleapis.com/icon?family=Material+Icons" 
        rel="stylesheet"
      />
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

      <div>
        {appButtons.map(() => (
          <Card style={{ width: '21rem' }}>
            <CardPrimaryAction>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'
                }}
              />
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                  Our Changing Planet
                </Typography>
                <Typography
                  use="subtitle2"
                  tag="h3"
                  theme="textSecondaryOnBackground"
                  style={{ marginTop: '-1rem' }}
                >
                  by Kurt Wagner
                </Typography>
                <Typography
                  use="body1"
                  tag="div"
                  theme="textSecondaryOnBackground"
                >
                  Visit ten places on our planet that are undergoing the biggest
                  changes today.
                </Typography>
              </div>
            </CardPrimaryAction>
            <CardActions>
              <CardActionButtons>
                <CardActionButton>Apply</CardActionButton>
              </CardActionButtons>
            </CardActions>
          </Card>
        ))}
          {/* <Card style={{ width: '21rem' }}>
            <CardPrimaryAction>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: 'url(images/backgrounds/mb-bg-fb-16.png)'
                }}
              />
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                  Our Changing Planet
                </Typography>
                <Typography
                  use="subtitle2"
                  tag="h3"
                  theme="textSecondaryOnBackground"
                  style={{ marginTop: '-1rem' }}
                >
                  by Kurt Wagner
                </Typography>
                <Typography
                  use="body1"
                  tag="div"
                  theme="textSecondaryOnBackground"
                >
                  Visit ten places on our planet that are undergoing the biggest
                  changes today.
                </Typography>
              </div>
            </CardPrimaryAction>
            <CardActions>
              <CardActionButtons>
                <CardActionButton>Apply</CardActionButton>
              </CardActionButtons>
            </CardActions>
          </Card> */}
      </div>
    </div>
  ); 
}

export default ButtonArray;