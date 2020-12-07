import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '@rmwc/typography/styles';
import { Typography } from '@rmwc/typography';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import { useHistory } from 'react-router-dom';
const OuterDiv = styled.div`
    //border: 1px #ccc solid;
    margin: 10px 100px 10px 100px;
    text-align: center;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`
const AnswersDiv = styled.div`
    display:flex;
    flex-direction: column; 
    margin: 10px 300px 5px 300px
`
const CheckApplicant = () => {
    const params = useParams();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [app, setApp] = useState({});
    const [appUser, setAppUser] = useState({});
    const history = useHistory();
    const fetchEvent = async () => {
        const response = await fetch(`/events/${params.event_id}`)
        const json = await response.json();
        setDescription(json.description)
        setTitle(json.title);
        setType(json.type.charAt(0) + json.type.slice(1).toLowerCase());
        setMaxApplicants(json.max_applicants);
        setStartDate(json.start_date.slice(0,10));
        setEndDate(json.end_date.slice(0,10));
    }
    const fetchApplication = async () => {
        const response = await fetch(`/applications/${params.application_id}`)
        const json = await response.json();
        setApp(json);
    }
    const fetchAppUser = async () => {
        const response = await fetch(`/applications/getApplicant/${params.application_id}`);
        const json = await response.json();
        console.log(json)
        setAppUser(json);
    }
    useEffect(() => {
        fetchEvent();
        fetchApplication();
        fetchAppUser();
    }, []);
    return(
        <div>
            <OuterDiv>
                <Typography use='headline3'>Event Title: {title}</Typography>
                <Typography use='headline3'>Event Type: {type}</Typography>
                <Typography use='headline5'>Description: {description}</Typography> 
                <Typography use='headline5'>Maximum Number of Teammates: {maxApplicants}</Typography> 
                <Typography use='headline5'>Time: {startDate} to {endDate}</Typography>
            </OuterDiv>
            <AnswersDiv>
                <Typography use='headline4'>Applicant Name</Typography>
                <Typography use='headline5'>{appUser.firstName} {appUser.lastName}</Typography>
                <Typography use='headline4'>Email</Typography>
                <Typography use='headline5'>{appUser.email}</Typography>
                <Typography use='headline4'>Tell us a bit about yourself</Typography>
                <Typography use='headline5'>{app.desc}</Typography>
                <Typography use='headline4'>Why do you want to join us?</Typography>
                <Typography use='headline5'>{app.whyDesc}</Typography>
                <Typography use='headline4'>Any extra comments?</Typography>
                <Typography use='headline5'>{app.comments}</Typography>
            </AnswersDiv>
            <ButtonDiv>
                <Button 
                    raised 
                    style={{width: 200, height: 50, marginRight: '30px', backgroundColor: '#f44336'}}
                    onClick={() => history.push(`/checkApplications/${params.event_id}`)}
                >
                    Back
                </Button>
            </ButtonDiv>
        </div>
    )
}

export default CheckApplicant;