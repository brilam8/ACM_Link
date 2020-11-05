import React, { useState, useEffect } from 'react';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogButton 
} from '@rmwc/dialog';
import { Link, useParams } from 'react-router-dom';

import '@rmwc/textfield/styles';
import '@rmwc/button/styles';
import '@rmwc/typography/styles';
import '@rmwc/dialog/styles';


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

  function handleSubmit(event) {
    if (descInput == '' || whyInput == '') {
      return;
    }
    event.preventDefault();
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
      <form>
        <div style={{
          'display': 'flex', 
          'flex-direction': 'column',
          'justify-content': 'center', 
          'align-items':'center', 
          'height': '100vh'
        }}>
          <Typography use='headline3'>
            {event.title} Application
          </Typography>

          <Typography use='headline5' style={{
            'margin-top': '50px'
          }}>
            {event.description}
          </Typography>

          <Typography use='headline5' style={{
            'margin-top': '25px'
          }}>
            Maximum Number of Teammates: {event.max_applicants}
          </Typography>

          <Typography use='headline5' style={{
            'margin-top': '25px'
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
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>This is a standard dialog.</DialogContent>
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
            required
            outlined
            style={{
              'width': '80%',
              'margin-top': '25px'
            }}
            onChange={e=>setDescInput(e.target.value)}
          />

          <TextField 
            label='Why do you want to join us?'
            required
            outlined
            style={{
              'width': '80%',
              'margin-top': '25px'
            }}
            onChange={e=>setWhyInput(e.target.value)}
          />

          <TextField 
            label='Any extra comments?' 
            outlined
            style={{
              'width': '80%',
              'margin-top': '25px'
            }}
            onChange={e=>setCommentInput(e.target.value)}
          />

          <div style={{
            'margin-top': '25px'
          }}>
            <Link to={'/'} style={{
              'text-decoration': 'none'
            }}>
              <Button>Cancel</Button>
            </Link>
            <Button raised onClick={event => handleSubmit(event)}>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}


export default ApplicationForm;