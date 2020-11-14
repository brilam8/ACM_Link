import React, {useState,useEffect} from 'react';
import firebase from '../firebase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import {Typography} from '@rmwc/typography'
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import '@rmwc/select/styles';
import '@rmwc/textfield/styles';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CreateEvent = () => {
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [maxApplicants, setMaxApplicants] = useState()
    const [endDate, setEndDate] = useState()
    const history = useHistory();
    
    const createOwnerEvent = (event) => {
        event.preventDefault()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // A user is signed in.
                console.log(user) 
                const data = {
                    creator_id: user.uid,
                    description: description,
                    end_date: endDate,
                    max_applicants: maxApplicants,
                    status: true,
                    title: title,
                    type: type
                }
                const response = fetch(`/events/create/${user.uid}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })
                return response.json;
            } else {
                // No user is signed in.
                console.log('There is no logged in user');
                history.push('/')
            }
        });
    }
    // const fetchGreeting = async () => {
    //     const response = await fetch(`/users?user_id=${UID}`)
    //     const json = await response.json();
    //     console.log(json[0].firstName, json[0].lastName)
    //     setGreeting(`${json[0].firstName} ${json[0].lastName}'s Event`) 
    // }

    // useEffect(() => {
    //     fetchGreeting()
    // }, [])

    return(
        <div>
            <form onSubmit={createOwnerEvent}>

                <div style={{
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justifyContent': 'flex-start',
                    'align-items': 'flex-start'
                }}>

                <Select required style={{
                   'width': '100%' 
                }}label='Event Type' placeholder='Select one' options={['Games', 'Homework', 'Projects']} onChange={(e) => setType(e.target.value)} />
                </div>


                <TextField required style={{
                    'width': '80%',
                }}label='Event Title' onChange={(e) => setTitle(e.target.value)} /> <br/>
                <TextField required label='Max Applicants' onChange={(e) => setMaxApplicants(Number(e.target.value))} /> <br/>
                <TextField required textarea style={{ backgroundColor: '#F5F5F5' }} label='Description' onChange={(e) => setDescription(e.target.value)} /> <br/>
                <TextField required label='End Date' type='date' onChange={(e) => setEndDate(e.target.value)} /> <br/>
                <br/>
                <Button variant="contained" color="primary" type='submit'>Create Event</Button>
            </form>
            
        </div>
    )
}
export default CreateEvent;