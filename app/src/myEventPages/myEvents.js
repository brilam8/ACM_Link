import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { Button } from '@rmwc/button'
import { Typography } from '@rmwc/typography';
import '@rmwc/typography/styles';
import { useHistory } from 'react-router-dom';
import EventCard from './myEventCard'
const TypographyStyled = styled(Typography)`
    margin-left: 15px;
    font-weight: 800;
`
const CreateEventContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 15px;
`
const EventsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

`
const MyEvents = () => {
    const history = useHistory(); 
    const [openEvents, setOpenEvents] = useState([]);
    const [closedEvents, setClosedEvents] = useState([]);
    const fetchEvents = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user){
                console.log(user);
                const response = await fetch(`/events/getOwnerEvents/${user.uid}`)
                const json = await response.json();
                setOpenEvents(openEvents.concat(json.filter((event) => event.status === true)));
                setClosedEvents(closedEvents.concat(json.filter((event) => event.status === false)));
            }
        })
    
    }
    useEffect(() => {
        fetchEvents();
    }, [])

    return(
        <div>
            <CreateEventContainer>
            <Button 
                raised 
                onClick={() => history.push('/createEvent')}
                style={{width: 180, height: 50, marginRight: '20px'}} 
            >
                + Create Event
            </Button>
            </CreateEventContainer>

            <TypographyStyled use='headline4'>My Open Posts</TypographyStyled>
            <EventsContainer>
            {openEvents.map((event) => (
                <EventCard key={event.event_id} event_id={event.event_id} closed={false}/>
            ))}
            </EventsContainer>
            <TypographyStyled use='headline4'>My Closed Posts</TypographyStyled>
            <EventsContainer>
            {closedEvents.map((event) => (
                <EventCard key={event.event_id} event_id={event.event_id} closed={true}/>
            ))}
            </EventsContainer>
        </div>
    )
}
export default MyEvents;