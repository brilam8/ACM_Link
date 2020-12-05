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
      handleFilter(res);
    }
    else if(homework == true) {
      homeworkFilter(res);
    }
    else if(games == true) {
      gamesFilter(res);
    }
    else if(projects == true) {
      projectsFilter(res);
    }
    else {
      setFilteredEvents(res);
    }
    if(dateFilter == true) {
      dateFilter(res);
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
  async function homeworkFilter(unfilteredResults) {
    if(homework == true) {
      setFilteredEvents([])
      console.log("HANDLING FILTER HOMEWORK");
      const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("homework"));
      setFilteredEvents(filters); 
    }
  }

/**
 * Column filtering based on the games filter
 */
async function gamesFilter(unfilteredResults) {
  if(games == true) {
    setFilteredEvents([])
    console.log("HANDLING FILTER HOMEWORK");
    const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("games"));
    setFilteredEvents(filters); 
  }
}
/**
 * Column filtering based on the projects filter.
 */
async function projectsFilter(unfilteredResults) {
  if(projects == true) {
    setFilteredEvents([])
    console.log("HANDLING FILTER HOMEWORK");
    const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("project"));
    setFilteredEvents(filters); 
  }
}

  function dateFilter(unfilteredResults) {
      console.log(filteredEvents[0].start_date + "STARTING DATE");
      const filteredEvents = unfilteredResults.sort((a,b) => b.start_date["_seconds"] - a.start_date["_seconds"]);
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
            return (
              // Printing the title and description of each event, along with the status
              <>
                <EventCard
                  user_id = {event.creator_id}       
                  event_id= {event.event_id}
                  />
                  <h1>{ event.start_date["_seconds"] }</h1>
              </>
            )
          })}
        </div>
        <div>
          {/* Chceckboxes to sort filter. */}
          <Typography>
            Type:
          </Typography>
          <p>Games</p>
          <Checkbox label="Games" onChange={()=> {
            if(games == false) {
              setGames(true);
            }
            else {
              setGames(false);
            }
            }}/>
        </div>
        <div>
          <p>Homework</p>
          <Checkbox label="Homework" onChange={()=> {
            if(homework == false) {
              setHomework(true);
            }
            else {
              setHomework(false);
            }
            }}/>
        </div>
        <div>
          <p>Projects</p>
          <Checkbox label="Projects" onChange={()=> {
            if(projects == false) {
              setProjects(true);
            }
            else {
              setProjects(false);
            }
            }}/>
            <Checkbox label = "TESTDateFilter" onChange={()=> {
              dateFilter();
            }}/>
        </div>
        <div>
          <Typography>
            Sort by
            </Typography>
            <Typography>
              Post Name:
              Date:
            </Typography>
            <Checkbox label = "Date" > </Checkbox>
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