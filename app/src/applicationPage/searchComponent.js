import React, { useState } from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import { Typography } from '@rmwc/typography'
import EventCard from '../components/eventCardComponent';


function SearchForm() {
  const [output, setOutput] = useState([])
  const [input, setInput] = useState('');
  const [inputSubmit, setInputSubmit] = useState('');


  //Array set to store results from the fetch function
  const [results, setResults] = useState([]);
  //Textbox element used for filtering the events.
  const [search, setSearch] = useState('')
  //Array set to store the filtered events.
  const [filteredEvents, setfilteredEvents] = useState([]);

  /**
   * Fetches all the events from the database and stores the elements within an array.
   */
  async function handleSubmit() {
    setInputSubmit(input);
    console.log("FETCHING");
    const results = await fetch("http://localhost:5000/events/");
    setResults(await results.json());;
  }

  async function handleFilter() {
    console.log("HANDLING FILTER");
    const filteredEvents = await results.filter(event => event.title.toLowerCase().includes(input.toLowerCase()));
    setfilteredEvents(await filteredEvents);
  }
/**
 * Column filtering based on the homework filter
 */
  async function homeworkFilter() {
    console.log("HANDLING FILTER HOMEWORKL");
    const filteredEvents = await results.filter(event => event.type.toLowerCase().includes("homework"));
    setfilteredEvents(await filteredEvents);
  }

/**
 * Column filtering based on the games filter
 */
  async function gamesFilter() {
    console.log("HANDLING FILTER GAMES");
    const filteredEvents = await results.filter(event => event.type.toLowerCase().includes("games"));
    setfilteredEvents(await filteredEvents);
  }

/**
 * Column filtering based on the projects filter.
 */
  async function projectsFilter() {
    console.log("HANDLING FILTER PROJECTS");
    const filteredEvents = await results.filter(event => event.type.toLowerCase().includes("projects"));
    setfilteredEvents(await filteredEvents);
  }

  //Filtering Events based on the type with typing
  // const filteredEvents = results.filter(event => event.type.toLowerCase().includes(search.toLowerCase()));
  // const filteredEvents = results.filter(event => event.type.toLowerCase().includes(input.toLowerCase()));
  return (
    <div className="SearchForm">
      <div style={{ 'marginLeft': '50px' }}>
        <div className="App">
          <input type="text"  placeholder="Event Title:" onChange={e => setInput(e.target.value)}></input>
          <h1>Search Posts</h1>
          {filteredEvents.map(event => {
            // event.status = event.status.toString(); <-- Have yet to test
            return (
              // Printing the title and description of each event, along with the status
              <>
                <EventCard
                  user_id= {event.creator_id}        
                  event_id= {event.event_id}
                  />
              </>
            )
          })}
        </div>
        <div>
          {/* Chceckboxes to sort filter. */}
          <p>Games</p>
          <Checkbox label="Games" onChange={async()=>gamesFilter()}/>
        </div>
        <div>
          <p>Homework</p>
          <Checkbox label="Homework" onChange={async()=>homeworkFilter()}/>
        </div>
        <div>
          <p>Projects</p>
          <Checkbox label="Projects" onChange={async()=>projectsFilter()}/>
        </div>
        {/* Button to get all the events and calls async handleSubmit function */}
        <Button variant="contained" color="primary" onClick={async () => { await handleSubmit(); await handleFilter(); }}>
          Search Events
        </Button>
      </div>
   
      <Divider />
      <div style={{ 'marginLeft': '50px' }}>
        {/* Displays the searched text*/}
      </div>
    </div>
  );
}

export default SearchForm;

//TODO: 
//Incorportate the event cards for rickesh
//ALSO: incorporate the search functionality 