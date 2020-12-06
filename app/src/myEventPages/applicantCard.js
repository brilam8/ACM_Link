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
import guyImg from '../images/avatar-1.png';
import girlImg from '../images/avatar-2.png';

function EventCard({ application_id, event_id }) {
  const [application, setApplication] = useState({});
  const [appUser, setAppUser] = useState([])
  const avatar = appUser.avatar_type ? 'MALE' : 'FALSE';
  useEffect(() => {
    fetchApplication();
    fetchAppUser();
  }, []);


  async function fetchApplication() {
    const response = await fetch(`/applications/${application_id}`);
    const json = await response.json();
    setApplication(json);
  }

  async function fetchAppUser() {
    const response = await fetch(`/applications/getApplicant/${application_id}`);
    const json = await response.json();
    console.log(json);
    setAppUser(json);
  }
  //TODO add MISC category
  const imageMap = {
    'MALE': `url(${guyImg})`,
    'FEMALE': `url(${girlImg})`,
  }

  return (
    <div>
      <Card style={{ width: '20rem', height: '23rem', margin: '15px'}}>
        <CardPrimaryAction>
          <CardMedia
            square
            style={{
              backgroundImage: imageMap[avatar],
              height: '15rem',
              width: '15rem',
              margin: 'auto'
            }}
          />
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="headline6" tag="h2">
              {appUser.firstName} {appUser.lastName}
            </Typography>
            <Typography
              use="subtitle2"
              tag="h3"
              theme="textSecondaryOnBackground"
              style={{ marginTop: '-1rem' }}
            >
              {application.desc}
            </Typography>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
          <Link 
            to={`/checkApplicant/${event_id}/${application_id}`}
          >
            <CardActionButton>
              View More
            </CardActionButton>
          </Link>
          </CardActionButtons>
        </CardActions>
      </Card>
    </div>
  );
}


export default EventCard;