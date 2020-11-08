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
  SimpleDialog
} from '@rmwc/dialog';
import { Select } from '@rmwc/select';
import { Link, useParams } from 'react-router-dom';

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


function ApplicationForm() {
  const params = useParams();
  const [descInput, setDescInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [whyInput, setWhyInput] = useState('');
  const [event, setEvent] = useState({});
  const [open, setOpen] = useState(false);

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
    console.log('onCancel handler called');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (descInput === '' || whyInput === '') {
      return;
    }
    console.log('onSubmit handler called');
    setOpen(true);
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
        <div style={{
          'display':'flex',
          'justify-content': 'space-between',
          'align-items':'center',
          'background-color': 'black',
          'height': '8vh',
        }}>
          {/* PLACE HAMBURGER COMPONENT HERE */}
          <Typography use='headline5' style={{
            'color': 'white',
            'margin-left': '4%',
          }}>
            burger
          </Typography>

          <Typography use='headline3' style={{
            'color': 'white',
          }}>
            {event.title} Application
          </Typography>

          <Typography use='headline4' style={{
            'font-family': 'Nunito',
            'color': 'white',
            'margin-right': '4%',
          }}>
            acm
          </Typography>
        </div>       

        <div style={{
          'display': 'flex', 
          'flex-direction': 'column',
          'justify-content': 'center', 
          'align-items':'center', 
          'height': '55vh',
        }}>
          <Typography use='headline5' style={{
            'margin-top': '50px',
          }}>
            {event.description}
          </Typography>

          <Typography use='headline5' style={{
            'margin-top': '25px',
          }}>
            Maximum Number of Teammates: {event.max_applicants}
          </Typography>

          <Typography use='headline5' style={{
            'margin-top': '25px',
          }}>
            Time: {event.start_date} -> {event.end_date}
          </Typography>

          <Dialog
            open={open}
            onClose={evt => {
              console.log(evt.detail.action);
              setOpen(false);
            }}
            onClosed={evt => console.log(evt.detail.action)}
          >
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogContent>
              You've submitted your application for {event.title}.
            </DialogContent>
            <DialogActions>
              <Link to='/'>
                <DialogButton action="accept" isDefaultAction>
                  Sweet!
                </DialogButton>
              </Link>
            </DialogActions>
          </Dialog>
          

          <TextField 
            label="Tell us a bit about yourself"
            multiline
            required
            outlined
            style={{
              'width': '80%',
              'margin-top': '40px',
            }}
            onChange={e=>setDescInput(e.target.value)}
          />

          <TextField 
            label='Why do you want to join us?'
            required
            outlined
            style={{
              'width': '80%',
              'margin-top': '25px',
            }}
            onChange={e=>setWhyInput(e.target.value)}
          />

          <TextField 
            label='Any extra comments?' 
            outlined
            style={{
              'width': '80%',
              'margin-top': '25px',
            }}
            onChange={e=>setCommentInput(e.target.value)}
          />

          <div style={{
            'display': 'flex',
            'justify-content': 'space-between',
            'width': '10vw',
            'margin-top': '25px',
          }}>
            <Link type='button' to={'/'} style={{
              'text-decoration': 'none',
            }}>
              <Button type='button'>Cancel</Button>
            </Link>
            <Button raised>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}


export default ApplicationForm;