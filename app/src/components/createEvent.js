import React, {useState,useEffect} from 'react';
import Textfield from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'
const CreateEvent = () => {
    const [greeting, setGreeting] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('Game')
    const [maxApplicants, setMaxApplicants] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


    const createOwnerEvent = async (event) => {
        event.preventDefault()
        
        const data = {
            applications: [],
            creator_id: "test",
            description: description,
            end_date: endDate,
            event_id: Math.floor(Math.random() * 10000),
            max_applicants: maxApplicants,
            start_date: startDate,
            status: true,
            title: title,
            type: type
        }
        fetch('/events/createEvent', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => {
            return res.json()
        })
        .then((body) => {
            console.log(body) 
        })
    }
    const fetchGreeting = async () => {
        const response = await fetch('/users?user_id=2dQLZ6swxN7EwAsqkPsv')
        const json = await response.json();
        setGreeting(`${json[0].firstName} ${json[0].lastName}'s Event`) 
    }

    useEffect(() => {
        fetchGreeting()
    }, [])

    const handleDescriptionChange = (event) => {
        console.log(event.target.value);
        setDescription(event.target.value);
    }

    const handleTitleChange = (event) => {
        console.log(event.target.value);
        setTitle(event.target.value);
    }

    const handleMaxApplicantChange = (event) => {
        console.log(event.target.value);
        setMaxApplicants(event.target.value);
    }

    const handleStartDateChange = (event) => {
        console.log(event.target.value);
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        console.log(event.target.value);
        setEndDate(event.target.value);
    }

    const handleTypeChange = (event) => {
        console.log(event.target.value)
        setType(event.target.value)
    }
    return(
        <div>
            <h1>{greeting}</h1>
            <form onSubmit={createOwnerEvent}>
                <Typography>Event Type</Typography>
                <select onChange={handleTypeChange}>
                    <option value='Game'>Game</option>
                    <option value='Homework'>Homework</option>
                    <option value='Project'>Project</option>
                    <option value='Other'>Other</option>
                </select> <br/>
                <Typography>Event Title</Typography><Textfield onChange={handleTitleChange} /> <br/>
                <Typography>Max Applicants </Typography><Textfield onChange={handleMaxApplicantChange} /> <br/>
                <Typography>Event Description </Typography> <Textfield onChange={handleDescriptionChange} /> <br/>
                <Typography>Start Date </Typography><Textfield onChange={handleStartDateChange} /> <br/> 
                <Typography>End Date </Typography><Textfield onChange={handleEndDateChange} /> <br/>
                <br/>
                <Button variant="contained" color="primary" type='submit'>Create Event</Button>
            </form>
        </div>
    )
}
export default CreateEvent;