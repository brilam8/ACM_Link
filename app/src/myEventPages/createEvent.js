import React, {useState} from 'react';
import firebase from '../firebase';
import styled from 'styled-components'
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar'
import { useHistory } from 'react-router-dom';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogButton,
} from '@rmwc/dialog';
const ContainerDiv = styled.div`
    //border:1px #ccc solid;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    height: 35vw;
    width: 60%;
    margin: auto;
`
const EventFields = styled(TextField)`
    margin: 20px;
`

const EventTextArea = styled(TextField)`
    height: 344px;
    margin: 20px;
`

const EventSelect = styled(Select)`
    padding: 20px;
`
//TODO add unlimited max applicants
const CreateEvent = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    const [endDate, setEndDate] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const history = useHistory();
    
    const cancelCreateEvent = (event) => {
        event.preventDefault();
        setOpenDialog(true);
    }
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
                    type: type.toUpperCase()
                }
                const response = fetch(`/events/create/${user.uid}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })
                setOpenSnackbar(true);
                history.push('/myEvents')
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
            <Dialog
                open={openDialog}
                onClose={evt => {
                console.log(evt.detail.action);
                setOpenDialog(false);
                }}
                onClosed={evt => console.log(evt.detail.action)}
            >
            <DialogTitle>Cancel Event?</DialogTitle>
            <DialogContent>Are you sure you want to cancel creating this event? Your changes will be discarded.</DialogContent>
            <DialogActions>
                <DialogButton action="close" isDefaultAction>No</DialogButton>
                <DialogButton action="accept" onClick={()=>history.push('/myEvents')}>Yes</DialogButton>
            </DialogActions>
            </Dialog>
            <form onSubmit={createOwnerEvent}>
                <ContainerDiv>
                        <EventSelect 
                            required 
                            label='Event Type' 
                            placeholder='Select one' 
                            options={['Games', 'Homework', 'Projects', 'Other']} 
                            onChange={(e) => setType(e.target.value)} 
                        />
                        <EventFields 
                            required 
                            label='Event Title' 
                            onChange={(e) => setTitle(e.target.value)}
                        /> 
                        <EventFields 
                            required
                            type='number'
                            min='1'
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
                            onClick={() => setOpenDialog(true)}
                            style={{width: 180, height: 50, alignSelf: 'flex-end', marginRight: '20px', top: 10}} 
                        >
                            Cancel
                        </Button>
                        <EventTextArea 
                            required
                            textarea
                            style={{backgroundColor: '#F5F5F5'}} 
                            label='Description' onChange={(e) => setDescription(e.target.value)} 
                        />
                        <Button 
                            raised 
                            style={{alignSelf: 'flex-start', width: 180, height: 50, marginLeft: '20px', top: 10}}
                            type='submit'
                        >
                            Submit
                        </Button>
                </ContainerDiv>
            </form>
        </div>
    )
}
export default CreateEvent;