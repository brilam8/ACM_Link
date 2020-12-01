import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '@rmwc/typography/styles';
import { Typography } from '@rmwc/typography';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import { useHistory } from 'react-router-dom';
const OuterDiv = styled.div`
    //border: 1px #ccc solid;
    margin: 80px 300px 10px 300px;
    text-align: center;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;
`
const CheckEvent = () => {
    const params = useParams();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [maxApplicants, setMaxApplicants] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const history = useHistory();
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
        <div>
            <OuterDiv>
                <Typography use='headline3'>Event Title: {title}</Typography>
                <Typography use='headline3'>Event Type: {type}</Typography>
                <Typography use='headline5'>Description: {description}</Typography> 
                <Typography use='headline5'>Maximum Number of Teammates: {maxApplicants}</Typography> 
                <Typography use='headline5'>Time: {startDate} to {endDate}</Typography>
            </OuterDiv>
            <ButtonDiv>
                <Button 
                    raised 
                    style={{width: 200, height: 50, marginRight: '30px', backgroundColor: '#f44336'}}
                    onClick={() => history.push('/myEvents')}
                >
                    Close Post
                </Button>
                <Button 
                    raised 
                    style={{width: 200, height: 50, marginLeft: '30px', backgroundColor: '#000000'}}
                    onClick={() => history.push('/checkApplicants')}
                >
                    Check Applications
                </Button>
            </ButtonDiv>
        </div>
    )
}

export default CheckEvent;