import React, { useState, useEffect } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogButton,
} from '@rmwc/dialog';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import '@rmwc/textfield/styles';
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/dialog/styles';
import '@rmwc/select/styles';
import firebase from '../firebase';



// @params Takes a user_id and creator_id. 
// @desc Used for the application form. For integration with buttons
//       simply use a Link component and have it linked to:
//       /applicationPage/user_id/event_id
function ApplicationForm() {
  const params = useParams();
  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [whyInput, setWhyInput] = useState('');
  const [event, setEvent] = useState({});
  const [openSubDialog, setOpenSubDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false)

  useEffect(()=>{
    fetchEvent();
  }, []);

  async function fetchEvent() {
    const response = await fetch(`/events/${params.event_id}`);
    const data = await response.json();
    setEvent(data);
  }

  function handleCancel(event) {
    event.preventDefault();
    console.log('cancel')
    setOpenCancelDialog(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (descInput === '' || whyInput === '') {
      return;
    }
    console.log('onSubmit handler called');
    setOpenSubDialog(true);
    const output = {
      desc: descInput,
      comments: commentInput,
      whyDesc: whyInput
    }

    fetchURL(output);
    console.log(output);
  }

  async function fetchURL(output) {
    const currUser = firebase.auth().currentUser;
    if (currUser) {
      await fetch(`/applications/create/${currUser.uid}/${params.event_id}`, {
        method: "POST",
        body: JSON.stringify(output),
        headers: {"Content-Type":"application/json"}
      })
    }
  }

  return (
    <div className='ApplicationForm'>
      <form onSubmit={event => handleSubmit(event)}>
        {/* Div1 will contain the main content of the form including event 
        details and text fields */}
        <Div1>
          {/* First few Typography elements are for event details */}
          <Typography use='headline3' style={{
            marginTop: 25,
          }}>
            {event.title}
          </Typography>

          <Typography use='headline5' style={{
            marginTop: 25,
            width: '70%',
            textAlign: 'center'
          }}>
            {event.description}
          </Typography>

          <Typography use='headline5' style={{
            marginTop: 25,
          }}>
            Maximum Number of Teammates: {event.max_applicants}
          </Typography>

          <Typography use='headline5' style={{
            marginTop: '25px',
          }}>
            Time: {event.start_date} to {event.end_date}
          </Typography>          


          <TextFieldStyled1
            label="Tell us a bit about yourself"
            multiline="true"
            required
            outlined
            onChange={e=>setDescInput(e.target.value)}
          />

          <TextFieldStyled2
            label='Why do you want to join us?'
            required
            outlined
            onChange={e=>setWhyInput(e.target.value)}
          />

          <TextFieldStyled2
            label='Any extra comments?' 
            outlined
            onChange={e=>setCommentInput(e.target.value)}
          />

          {/* Used for submitting and cancel buttons */}
          <Div2>
            <Button 
              type='button' 
              onClick={event => handleCancel(event)}
              style={{marginRight: '5%'}}
            >
              Cancel
            </Button>

            <Button 
              raised
              style={{marginLeft: '5%'}}
            >
              Submit
            </Button>
          </Div2>

          {/* Dialog box upon hitting Submit */}
          <Dialog
            open={openSubDialog}
            onClose={evt => {
              console.log(evt.detail.action);
              setOpenSubDialog(false);
            }}
            onClosed={evt => console.log(evt.detail.action)}
          >
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogContent>
              You've submitted your application for {event.title}.
            </DialogContent>
            <DialogActions>
              <LinkStyled to='/homepage'>
                <DialogButton action="accept" isDefaultAction>
                  Sweet!
                </DialogButton>
              </LinkStyled>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openCancelDialog}
            onClose={evt => {
              console.log(evt.detail.action);
              setOpenCancelDialog(false);
            }}
            onClosed={evt => console.log(evt.detail.action)}
          >
            <DialogTitle>Canceling</DialogTitle>
            <DialogContent>
              Are you sure you want to cancel your application for {event.title}?
            </DialogContent>
            <DialogActions>
              <LinkStyled to='/test3'>
                <DialogButton action="accept" isDefaultAction>
                  Cancel
                </DialogButton>
              </LinkStyled>
            </DialogActions>
          </Dialog>
        </Div1>
      </form>
    </div>
  );
}

const Div1 = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center ;
  align-items: center;
`;

const Div2 = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  margin-top: 25px;
`;

const TextFieldStyled1 = styled(TextField)`
  width: 80%;
  margin-top: 40px;
`;

const TextFieldStyled2 = styled(TextField)`
  width: 80%;
  margin-top: 25px;
`;

// const BurgerMenu = styled(Typography)`
//   color: white;
//   margin-left: 4%;
// `;

// const MainHeadline = styled(Typography)`
//   color: white;
// `;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;


export default ApplicationForm;