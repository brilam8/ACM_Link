import React from 'react';
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import EventCard from './eventCardComponent';
import styled from 'styled-components';

export default function ListComponent({ title, list }) {
  return (
    <div style={{margin: 40}}>
      <Typography style = {{'margin-top': "40px"}} use="headline3">{title}</Typography>
      <div style={{display: 'flex', alignItems: 'center', marginTop: 10, flexWrap: 'wrap'}}>
        {list.map((user) => {
          console.log(user);
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