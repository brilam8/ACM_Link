import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import EventCard from '../components/eventCardComponent';


function SearchForm() {
  // const [output, setOutput] = useState([])
  const [input, setInput] = useState('');
  // const [inputSubmit, setInputSubmit] = useState('');


  //Array set to store results from the fetch function
  const [results, setResults] = useState([]);
  //Textbox element used for filtering the events.
  // const [search, setSearch] = useState('')
  //Array set to store the filtered events.
  const [filteredEvents, setfilteredEvents] = useState([]);

  /**
   * Fetches all the events from the database and stores the elements within an array.
   */
  async function handleSubmit() {
    // setInputSubmit(input);
    console.log("FETCHING");
    const results = await fetch("http://localhost:5000/events/");
    setResults(await results.json());;
  }

  function handleFilter() {
    console.log("HANDLING FILTER");
    const filteredEvents = results.filter(event => event.type.toLowerCase().includes(input.toLowerCase()));
    setfilteredEvents(filteredEvents);
  }
/**
 * Column filtering based on the homework filter
 */
  function homeworkFilter() {
    console.log("HANDLING FILTER HOMEWORK");
    const filteredEvents = results.filter(event => event.type.toLowerCase().includes("homework"));
    setfilteredEvents(filteredEvents);
  }

/**
 * Column filtering based on the games filter
 */
  function gamesFilter() {
    console.log("HANDLING FILTER GAMES");
    const filteredEvents = results.filter(event => event.type.toLowerCase().includes("games"));
    setfilteredEvents(filteredEvents);
  }

/**
 * Column filtering based on the projects filter.
 */
  function projectsFilter() {
    console.log("HANDLING FILTER PROJECTS");
    const filteredEvents = results.filter(event => event.type.toLowerCase().includes("projects"));
    setfilteredEvents(filteredEvents);
  }

  //Filtering Events based on the type with typing
  // const filteredEvents = results.filter(event => event.type.toLowerCase().includes(search.toLowerCase()));
  // const filteredEvents = results.filter(event => event.type.toLowerCase().includes(input.toLowerCase()));
  return (
    <div className="SearchForm">
      <div style={{ 'marginLeft': '50px' }}>
        <div className="App">
          <input type="text"  placeholder="Search Event Type" onChange={e => setInput(e.target.value)}></input>
          <h1>Search Posts</h1>
          {filteredEvents.map(event => {
            // event.status = event.status.toString(); <-- Have yet to test
            return (
              // Printing the title and description of each event, along with the status
              <>
                <h1> Title: {event.title}</h1>
                <h2> Description: {event.description}</h2>
                <h3>Type: {event.type} </h3>
                <h1> -------------------</h1>
                <EventCard
                  user_id= '6PRMGwVGACILQwTnbIHC'        
                  event_id= {event.event_id}
                  />
              </>
            )
          })}
        </div>
        <div>
          {/* Chceckboxes to sort filter. */}
          <p>Games</p>
          <Checkbox label="Games" onChange={()=>gamesFilter()}/>
        </div>
        <div>
          <p>Homework</p>
          <Checkbox label="Homework" onChange={()=>homeworkFilter()}/>
        </div>
        <div>
          <p>Projects</p>
          <Checkbox label="Projects" onChange={()=>projectsFilter()}/>
        </div>
        {/* Button to get all the events and calls async handleSubmit function */}
        <Button variant="contained" color="primary" onClick={() => { 
          handleSubmit(); 
          handleFilter(); 
        }}>
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