import React, {useState,useEffect} from 'react';


const CreateEvent = () => {
    const [event, setEvent] = useState('');
    const [greeting, setGreeting] = useState('')
    const createOwnerEvent = (event) => {
        event.preventDefault()

        // const data = {
        //     applications: ,
        //     creator_id: ,
        //     description: ,
        //     end_date: ,
        //     event_id: ,
        //     max_applicants: ,
        //     start_date: ,
        //     status: ,
        //     title: ,
        //     type: 
        // }
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
        setEvent(event.target.value);
    }

    const handleTitleChange = (event) => {
        console.log(event.target.value);
        setEvent(event.target.value);
    }

    const handleMaxApplicantChange = (event) => {
        console.log(event.target.value);
        setEvent(event.target.value);
    }

    const handleStartDateChange = (event) => {
        console.log(event.target.value);
        setEvent(event.target.value);
    }

    const handleEndDateChange = (event) => {
        console.log(event.target.value);
        setEvent(event.target.value);
    }
    return(
        <div>
            <h1>{greeting}</h1>
            <form onSubmit={createOwnerEvent} />
                <div>
                    Event Type
                    <select id='Categories'>
                        <option value='Game'>Game</option>
                        <option value='Homework'>Homework</option>
                        <option value='Project'>Project</option>
                        <option value='Other'>Other</option>
                    </select> <br/>
                    Event Title <input onChange={handleTitleChange} /> <br/>
                    Max Applicants <input onChange={handleMaxApplicantChange} /> <br/>
                    Event Description <input onChange={handleDescriptionChange} /> <br/>
                    Start Date <input onChange={handleStartDateChange} /> <br/> 
                    End Date <input onChange={handleEndDateChange} /> <br/>
                    <button type="submit">Create Event</button>
                </div>
        </div>
    )
}
export default CreateEvent;