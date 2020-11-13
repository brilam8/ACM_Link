import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import '@rmwc/card/styles';
import '@rmwc/typography/styles';
import gamesImg from '../images/games.jpg';
import homeworkImg from '../images/homework.jpg';
import projectsImg from '../images/projects.jpg';


function EventCard({ user_id, event_id }) {
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchEvent();
    fetchUser();
  }, []);

  async function fetchUser() {
    const response = await fetch(`/users/${user_id}`);
    const json = await response.json();
    console.log('user', json);
    setUser(json);
  }

  async function fetchEvent() {
    const response = await fetch(`/events/getOwnerEvent/${user_id}/${event_id}`);
    const json = await response.json();
    console.log('event', json);
    setEvent(json);
  }

  const imageMap = {
    'VIDEOGAMES': `url(${gamesImg})`,
    'PROJECTS': `url(${projectsImg})`,
    'HOMEWORK': `url(${homeworkImg})`,
  }

  return (
    <div>
      <Card style={{ width: '21rem' }}>
        <CardPrimaryAction>
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage: imageMap[`${event.type}`]
            }}
          />
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="headline6" tag="h2">
              {event.title}
            </Typography>
            <Typography
              use="subtitle2"
              tag="h3"
              theme="textSecondaryOnBackground"
              style={{ marginTop: '-1rem' }}
            >
              by {user.firstName} {user.lastName}
            </Typography>
            <Typography
              use="body1"
              tag="div"
              theme="textSecondaryOnBackground"
            >
              {event.description}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
          <Link 
            to={`/applicationPage/${user.user_id}/${event.event_id}`}
          >
            <CardActionButton>
              Apply
            </CardActionButton>
          </Link>
          </CardActionButtons>
        </CardActions>
      </Card>

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
  );
}


export default EventCard;