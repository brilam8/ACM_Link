import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import EventCard from '../components/eventCardComponent';


function SearchForm() {
  const [input, setInput] = useState('');


  //Array set to store results from the fetch function
  const [results, setResults] = useState([]);
  //Textbox element used for filtering the events.
  // const [search, setSearch] = useState('')
  //Array set to store the filtered events.
  const [filteredEvents, setFilteredEvents] = useState([]);

  //Boolean values that check whether or not checkboxes are checked 
  const [homework, setHomework] = useState(false)
  const [projects, setProjects] = useState(false);
  const [games, setGames] = useState(false);


  /**
   * Fetches all the events from the database and stores the elements within an array.
   */
  async function handleSubmit() {
    // setInputSubmit(input);
    console.log("FETCHING");
    setResults([]);
    const response = await fetch("http://localhost:5000/events/");
    const res = await response.json();
    setFilteredEvents([]);
    setResults(res);
    if(input != '') {
      handleFilter(res)
    }
    else {
      setFilteredEvents(res);
    }
  }

  function handleFilter(unfilteredResults) {
    setFilteredEvents([]);
    console.log("HANDLING FILTER");
    console.log("got data length = " + unfilteredResults.length)
    console.log("FILTER " + input);
    const events = unfilteredResults.filter(event => event.title.toLowerCase().includes(input.toLowerCase()));
    setFilteredEvents(events);
  }
/**
 * Column filtering based on the homework filter
 */
  function homeworkFilter() {
    if(homework == false) {
      setFilteredEvents([])
      console.log("HANDLING FILTER HOMEWORK");
      
      const filters = results.filter(event => event.type.toLowerCase().includes("homework"));
      //console.log(filters);
      setFilteredEvents(filters);
      setHomework(true)
    }
    else {
      setHomework(false)
    }
  }

/**
 * Column filtering based on the games filter
 */
  function gamesFilter() {
    if(games == false) {
      setFilteredEvents([])
      console.log("HANDLING FILTER GAMES");
      const filteredEvents = results.filter(event => event.type.toLowerCase().includes("games"));
      //console.log(filteredEvents);
      setFilteredEvents(filteredEvents);
      setGames(true);
    }
    else {
      setGames(false);
    }
  }
/**
 * Column filtering based on the projects filter.
 */
  function projectsFilter() {
    if(projects == false) {
      setFilteredEvents([])
      console.log("HANDLING FILTER PROJECTS");
      const filteredEvents = results.filter(event => event.type.toLowerCase().includes("projects"));
      //console.log(filteredEvents);
      setFilteredEvents(filteredEvents);
      setProjects(true);
    }
    else {
      setProjects(false);
    }
  }

  function dateFilter() {
      const filteredEvents = results.sort((a,b) => b.start_date - a.start_date);
      setFilteredEvents(filteredEvents);
  }

  //Filtering Events based on the type with typing

  return (
    <div className="SearchForm">
      <div style={{ 'marginLeft': '50px' }}>
        <div className="App">
          <input type="text"  placeholder="Search Event Title" onChange={e => setInput(e.target.value)}></input>
          <h1>Search Posts</h1>
          {filteredEvents.map(event => {
            // event.status = event.status.toString(); <-- Have yet to test
            //console.log(event.creator_id)
            console.log(event.event_id)
            return (
              // Printing the title and description of each event, along with the status
              
              <>
                <EventCard
                  user_id = {event.creator_id}       
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
        <div>
          <Typography>
            Sort By Date:
            <Checkbox label = "Sort By Date" onChange={()=>dateFilter()}>
            </Checkbox>
          </Typography>
        </div>
        {/* Button to get all the events and calls async handleSubmit function */}
        <Button variant="contained" color="primary" onClick= { async()=> { 
          await handleSubmit(); 
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