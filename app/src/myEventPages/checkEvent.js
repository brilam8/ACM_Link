import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { Button } from '@rmwc/button'
import { Typography } from '@rmwc/typography';
import { useParams } from 'react-router-dom';
import '@rmwc/typography/styles';
import { useHistory } from 'react-router-dom';

const TypographyStyled = styled(Typography)`
    margin-left: 15px;
    font-weight: 800;
`
const CheckEvent = () => {
    const params = useParams();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    //const [startDate, setStartDate] = useState({});
    //const [endDate, setEndDate] = useState({});

    const fetchEvent = async () => {
        const response = await fetch(`/events/${params.event_id}`)
        const json = await response.json();
        console.log(json)
        setDescription(json.description)
        setTitle(json.title);
        setType(json.type);
        setMaxApplicants(json.max_applicants);
        //setStartDate(json.startDate);
        //setEndDate(json.end_date);
    }
    useEffect(() => {
        fetchEvent();
    }, []);
    return(
        <div>
            {description} <br></br>
            Maximum Number of Teammates: {maxApplicants}

        </div>
    )
}

export default CheckEvent;