import React, {useState} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'

function SampleAPI2() {

  const [input, setInput] = useState('');
  const [inputSubmit, setInputSubmit] = useState('');
  const [output, setOutput] = useState([])
  const [results, setResults] = useState([]);
  const[search, setSearch] = useState('')
  const[FilteredEvents, setFilteredEvents] = useState([]);

  
  // Submit function that fetches the data from getAllEvents CRUD function
  async function handleSubmit () {
    console.log("Handling Submit");
    setInputSubmit(input);
    setOutput([...output, input]);
    setInput('');
    const results = await fetch("http://localhost:5000/events/")
    setResults(await results.json());
  }
  
  const filteredEvents = results.filter(event => event.type.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="SampleAPI2">
      <div style={{'marginLeft': '50px'}}>
        <div className = "App">
        <input type="text" placeholder="Search Event Type" onChange={e => setSearch(e.target.value)}></input>

        {filteredEvents.map(event => {
          return (
            <>
            <h1> Title: { event.title}</h1>
            <h2> Description: { event.description }</h2>
            <h3>Status: {event.status} </h3>
            <h1> -------------------</h1>
            </>
          )
        })}
        </div>

        <Button variant="contained" color="primary" onClick={ async () => {await handleSubmit();} }>
          Get All Events
        </Button>
      </div>
      <div style={{'marginLeft': '50px'}}>
      <ul>
                Results: {JSON.stringify(filteredEvents)}
            </ul>
      </div>
      <Divider/>
      <div style={{'marginLeft': '50px'}}>
        {
          output.map((text) => {
            return (
              <div>
                <Typography>
                  Searched Event: {text}
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