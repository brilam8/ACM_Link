import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'
import { Select } from '@rmwc/select'
import '@rmwc/select/styles'
import '@rmwc/textfield/styles';
import { useParams } from 'react-router-dom';
const CreateEvent = () => {
    const [greeting, setGreeting] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [maxApplicants, setMaxApplicants] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const params = useParams();
    const createOwnerEvent = async (event) => {
        event.preventDefault()
        console.log(params.user_id)
        const data = {
            creator_id: params.user_id,
            description: description,
            end_date: endDate,
            max_applicants: maxApplicants,
            start_date: startDate,
            status: true,
            title: title,
            type: type
        }
        fetch(`/events/create/${params.user_id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => {
            console.log(res) 
            return res.json()
        })
        .then((body) => {
            console.log(body) 
        })
    }
    const fetchGreeting = async () => {
        const response = await fetch(`/users?user_id=${params.user_id}`)
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
        <div style={{
            'display': 'flex',
            'flex-direction': 'column',
        }}>
            <h1>{greeting}</h1>
            <form onSubmit={createOwnerEvent}>

                <Select required style={{
                   'width': '100%',
                   flex: '1'
                }}label='Event Type' placeholder='Select one' options={['Games', 'Homework', 'Projects']} />

                <TextField required style={{
                    'width': '80%',
                    flex: '1'
                }}label='Event Title' onChange={handleTitleChange} /> <br/>
                <TextField required label='Max Applicants' onChange={handleMaxApplicantChange} /> <br/>
                <TextField required textarea style={{ 
                    backgroundColor: '#F5F5F5',
                }} label='Description' onChange={handleDescriptionChange} /> <br/>
                <TextField required label='Start Date' type='date' onChange={handleStartDateChange} />
                <TextField required label='End Date' type='date' onChange={handleEndDateChange} /> <br/>
                <br/>
                <Button variant="contained" color="primary" type='submit'>Create Event</Button>
            </form>
            
        </div>
    )
}
export default CreateEvent;