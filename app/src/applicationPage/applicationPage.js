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
import { Select } from '@rmwc/select';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';

import '@rmwc/textfield/styles';
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/dialog/styles';
import '@rmwc/select/styles';


{/* TODO: 

1. Don't know how to make multiline TextField components.
  
2. Enter key reroutes page to '/'. handleCancel nor handleSubmit are 
called. Don't know how to fix this.

Solutions Tried:
1. Instead of Dialog, used Simple Dialog. First con: there is a redundant
built-in Cancel button. Second con: Cancel and Accept buttons cannot reroute
to another page. Both call handleSubmit() and send identical applications to 
the database.
2. Commenting out SOLELY dialog component fixes form and submits application 
upon pressing Enter key.

Sites visited: 
1. https://stackoverflow.com/questions/33211672/how-to-submit-a-form-using-enter-key-in-react-js
2. https://stackoverflow.com/questions/33211672/how-to-submit-a-form-using-enter-key-in-react-js/33212911 

*/}


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
    setEvent(data[0]);
    console.log(event);
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
    await fetch(`/applications/create/${params.UID}/${params.event_id}`, {
      method: "POST",
      body: JSON.stringify(output),
      headers: {"Content-Type":"application/json"}
    })
  }

  return (
    <div className='ApplicationForm'>
      <form onSubmit={event => handleSubmit(event)}>
        {/* Div2 will contain the main content of the form including event 
        details and text fields */}
        <Div2>
          {/* First few Typography elements are for event details */}
          <Typography use='headline3' style={{
            marginTop: 100,
          }}>
            {event.title}
          </Typography>

          <Typography use='headline5' style={{
            marginTop: 25,
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
            multiline
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
          <Div3>
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
          </Div3>

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
              <LinkStyled to='/test3'>
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
        </Div2>
      </form>
    </div>
  );
}


const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  height: 8vh;
`;

const Div2 = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center ;
  align-items: center;
  height: 55vh;
`;

const Div3 = styled.div`
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

const BurgerMenu = styled(Typography)`
  color: white;
  margin-left: 4%;
`;

const MainHeadline = styled(Typography)`
  color: white;
`;

const LinkStyled = styled(Link)`
text-decoration: none;
`;


export default ApplicationForm;