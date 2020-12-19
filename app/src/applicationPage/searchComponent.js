import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Checkbox, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import EventCard from '../components/eventCardComponent';
import { TextField } from '@rmwc/textfield'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';




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
  const [date, setDate] = useState(false);


  /**
   * Fetches all the events from the database and stores the elements within an array.
   */
  async function handleSubmit() {
    setResults([]);
    const response = await fetch("http://localhost:5000/events/");
    const res = await response.json();
    setFilteredEvents([]);
    setResults(res);
    if (input != '') {
      handleFilter(res);
    }
    else if (homework == true) {
      homeworkFilter(res);
    }
    else if (games == true) {
      gamesFilter(res);
    }
    else if (projects == true) {
      projectsFilter(res);
    }
    else {
      setFilteredEvents(res);
    }
    if (date == true) {
      dateFilter(res);
    }
  }

  function handleFilter(unfilteredResults) {
    setFilteredEvents([]);
    const events = unfilteredResults.filter(event => event.title.toLowerCase().includes(input.toLowerCase()));
    setFilteredEvents(events);
  }
  /**
   * Column filtering based on the homework filter
   */
  async function homeworkFilter(unfilteredResults) {
    if (homework == true) {
      setFilteredEvents([])
      const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("homework"));
      setFilteredEvents(filters);
    }
  }

  /**
   * Column filtering based on the games filter
   */
  async function gamesFilter(unfilteredResults) {
    if (games == true) {
      setFilteredEvents([])
      const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("games"));
      setFilteredEvents(filters);
    }
  }
  /**
   * Column filtering based on the projects filter.
   */
  async function projectsFilter(unfilteredResults) {
    if (projects == true) {
      setFilteredEvents([])
      const filters = unfilteredResults.filter(event => event.type.toLowerCase().includes("project"));
      setFilteredEvents(filters);
    }
  }


  function dateFilter(unfilteredResults) {
    // const filteredEvents = unfilteredResults.sort((a,b) => b.start_date["_seconds"] - a.start_date["_seconds"]);
    let filtered = [];
    let n = unfilteredResults.length;
    for (let i = 0; i < unfilteredResults.length(); i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (unfilteredResults[j].start_date["_seconds"] > unfilteredResults[j + 1].start_date["_seconds"]) {
          let temp = unfilteredResults[j];
          unfilteredResults[j] = unfilteredResults[j + 1];
          unfilteredResults[j + 1] = temp;
        }
      }
    }
    setFilteredEvents(unfilteredResults);
  }

  //Filtering Events based on the type with typing

  return (
    <div className="SearchForm">
      <div style={{ 'marginLeft': '50px' }}>
        <div className="App">
          <TextField
            style={{
              width: "25%",
              margin: "2.5% 0% 2.5% 0%",
              color: "black"
            }}
            value={input}
            label="Search posts"
            onChange={e => setInput(e.target.value)}
          />
          <Button variant="contained" style={{ margin: "2.5% 0% 2.5% 1%" }} color="primary" onClick={async () => {
            await handleSubmit();
          }}>
            Search Events
        </Button>
          {/* <div style={{display: 'flex', alignItems: 'center', marginTop: 0, flexWrap: 'wrap'}}> */}
          {/* <div className="huge-container" style={{display: 'flex', width: '100%',}}> */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="left-side" style={{}}>
              <Box
                border={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography>
                  <Box
                    bgcolor="#212121"
                    borderBottom={2}
                    borderTop={2}
                  >
                    <h3 style={{ color: 'white', textAlign: 'center' }}>FILTERS:</h3>
                  </Box>
                </Typography>
                {/* Chceckboxes to sort filter. */}
                <Typography>
                  <h3 style={{ textAlign: 'center', margin: "2.5% 0% 2.5% 1%" }}>Type:</h3>
                </Typography>
                {/* <p>Games</p> */}
                <FormControlLabel
                  control={
                    <Checkbox label="Games" name="Games" style = {{marginLeft: '15px'}} onChange={() => {
                      if (games == false) {
                        setGames(true);
                      }
                      else {
                        setGames(false);
                      }
                    }} />
                  }
                  label="Games"
                />
                <div>
                  <FormControlLabel
                    label="Homework"
                    control={
                      <Checkbox style = {{marginLeft: '15px'}} onChange={() => {
                        if (homework == false) {
                          setHomework(true);
                        }
                        else {
                          setHomework(false);
                        }
                      }} />
                    }
                  />

                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox label="Projects" style = {{marginLeft: '15px'}} onChange={() => {
                        if (projects == false) {
                          setProjects(true);
                        }
                        else {
                          setProjects(false);
                        }
                      }} />
                    }
                    label="Projects"
                  />
                </div>
                <Typography>
                  <h3 style={{ textAlign: 'center', margin: "3% 0% 1.5% 0%" }}>Sort By:</h3>
                </Typography>
                {/* </Box> */}
                {/* </div> */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 0, flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox  style = {{marginLeft: '15px'}} label="Date"> onChange={() => {
                        if (date == false) {
                          setDate(true);
                        }
                        else {
                          setDate(false);
                        }
                      }}/</Checkbox>
                    }
                    label="Date"
                  />
                </div>
              </Box>
            </div>
            {/* <div className="right-side" style={{ 'flex': 2, 'width': '100%', }}> */}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25px', flexWrap: 'wrap' }}>
              {filteredEvents.map(event => {
                return (
                  // Printing the title and description of each event, along with the status

                  <>
                    <EventCard
                      user_id={event.creator_id}
                      event_id={event.event_id}
                    />
                    {/* <h1>{ event.start_date["_seconds"] }</h1> */}
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default SearchForm;