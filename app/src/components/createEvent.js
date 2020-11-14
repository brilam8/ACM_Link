import React, {useState,useEffect} from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import { Button } from '@rmwc/button';
import {Typography} from '@rmwc/typography'
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import '@rmwc/select/styles';
import '@rmwc/textfield/styles';
import { useHistory } from 'react-router-dom';

const RowDiv = styled.div`
    display: flex;
    justify-content: center;
    //border:1px #ccc solid;
`

const InnerDiv = styled.div`
    //border:1px #ccc solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
    width: 50vh;
    margin: 15px;
`

const EventFields = styled(TextField)`
    margin: 13px;
`

const EventTextArea = styled(TextField)`
    margin: 12px;
`

const EventSelect = styled(Select)`
    padding: 14px;
`

const CreateEvent = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    const [endDate, setEndDate] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const history = useHistory();
    
    //Runs on submit. Checks for user login and then POSTs the fields in the form
    const createOwnerEvent = (event) => {
        event.preventDefault();
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
                setOpenSnackbar(true);
                return response.json;
            } else {
                // No user is signed in.
                console.log('There is no logged in user');
                history.push('/');
            }
        });
    }

    return(
        <div>
            <Snackbar
                open={openSnackbar}
                onClose={evt => setOpenSnackbar(false)}
                message='Successfully Created Event!'
                dismissesOnAction
                action={
                    <SnackbarAction
                        label="Dismiss"
                        onClick={() => console.log('Snackbar Dismissed')}
                    />
                }
            />

            <Typography style = {{display: 'flex', justifyContent: 'center', marginTop: 60}} use="headline2">Create New Event</Typography>
            <form onSubmit={createOwnerEvent}>
                <RowDiv>
                    <InnerDiv>
                        <EventSelect 
                            required 
                            label='Event Type' 
                            placeholder='Select one' 
                            options={['Games', 'Homework', 'Projects']} 
                            onChange={(e) => setType(e.target.value)} 
                        />
                        <EventFields 
                            required 
                            label='Event Title' 
                            onChange={(e) => setTitle(e.target.value)}
                        /> 
                        <EventFields 
                            required 
                            label='Max Applicants' 
                            onChange={(e) => setMaxApplicants(Number(e.target.value))} 
                        /> 
                        <EventFields 
                            required 
                            label='End Date' 
                            type='date' onChange={(e) => setEndDate(e.target.value)} 
                        /> 
                        <Button 
                            raised 
                            style={{alignSelf: 'flex-end', width: 180, height: 50, marginRight: 12, top: 32}}
                        >
                            Cancel
                        </Button>
                    </InnerDiv>
                    <InnerDiv>
                        <EventTextArea 
                            required 
                            textarea
                            style={{backgroundColor: '#F5F5F5', marginTop: 45, marginBottom: 45}} 
                            label='Description' rows={10} onChange={(e) => setDescription(e.target.value)} 
                        />
                        <Button 
                            raised 
                            style={{alignSelf: 'flex-start', width: 180, height: 50, marginLeft: 12}} type='submit'
                        >
                            Submit
                        </Button>
                    </InnerDiv>
                </RowDiv>
            </form>
        </div>
    )
}
export default CreateEvent;