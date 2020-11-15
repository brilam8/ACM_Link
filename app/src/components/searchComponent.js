import React, { useState } from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import { Typography } from '@rmwc/typography'


function SampleAPI2() {
  const [output, setOutput] = useState([])
  //Array set to store results from the fetch function
  const [results, setResults] = useState([]);
  //Textbox element used for filtering the events.
  const [search, setSearch] = useState('')
  //Array set to store the filtered events.
  const [FilteredEvents, setFilteredEvents] = useState([]);


  // Submit function that fetches the data from getAllEvents CRUD function
  async function handleSubmit() {
    const results = await fetch("http://localhost:5000/events/")
    setResults(await results.json());
  }

  //Filtering Events based on the type with typing
  const filteredEvents = results.filter(event => event.type.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="SampleAPI2">
      <div style={{ 'marginLeft': '50px' }}>
        <div className="App">
          <input type="text" placeholder="Search Event Type" onChange={e => setSearch(e.target.value)}></input>

          {filteredEvents.map(event => {
            event.status = event.status.toString();
            return (
              // Printing the title and description of each event, along with the status
              <>
                <h1> Title: {event.title}</h1>
                <h2> Description: {event.description}</h2>
                <h3>Type: {event.type} </h3>
                <h1> -------------------</h1>
              </>
            )
          })}
        </div>
        <div>
          {/* Chceckboxes to sort filter. */}
          <p>Games</p>
          <Checkbox label="Games" />
        </div>
        <div>
          <p>Homework</p>
          <Checkbox label="Homework" />
        </div>
        <div>
          <p>Projects</p>
          <Checkbox label="Projects" />
        </div>
        {/* Button to get all the events and calls async handleSubmit function */}
        <Button variant="contained" color="primary" onClick={async () => { await handleSubmit(); }}>
          Get All Events
        </Button>
      </div>
      <Divider />
      <div style={{ 'marginLeft': '50px' }}>
        {/* Displays the searched text*/}
        {
          output.map((text) => {
            return (
              <div>
                <Typography>
                  Searched Event: {search}
                </Typography>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default SampleAPI2;