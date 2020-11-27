import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '@rmwc/typography/styles';
import { Typography } from '@rmwc/typography';
import styled from 'styled-components'
const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CheckEvent = () => {
    const params = useParams();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const fetchEvent = async () => {
        const response = await fetch(`/events/${params.event_id}`)
        const json = await response.json();
        console.log(json)
        setDescription(json.description)
        setTitle(json.title);
        setType(json.type.toLowerCase());
        setMaxApplicants(json.max_applicants);
        setStartDate(json.start_date.slice(0,10));
        setEndDate(json.end_date.slice(0,10));
    }
    useEffect(() => {
        fetchEvent();
    }, []);
    return(
        <OuterDiv>
            <Typography use='headline3'>Event Title: {title}</Typography>
            <Typography use='headline3'>Event Type: {type}</Typography>
            <Typography use='headline5'>Description: {description}</Typography> 
            <Typography use='headline5'>Maximum Number of Teammates: {maxApplicants}</Typography> 
            <Typography use='headline5'>Time: {startDate} to {endDate}</Typography>
        </OuterDiv>
    )
}

export default CheckEvent;