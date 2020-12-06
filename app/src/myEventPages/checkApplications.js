import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './applicantCard';
import styled from 'styled-components';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { useHistory } from 'react-router-dom';
const OuterDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
`
const FooterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CheckApplications = () => {
    const params = useParams();
    const [applications, setApplications] = useState([]);
    const history = useHistory();
    const fetchApplications = async () => {
        const response = await fetch(`/events/${params.event_id}`);
        const json = await response.json();
        setApplications(applications.concat(json.applications));
    }
    useEffect(() => {
        fetchApplications();
    }, []);
    return(
        <div>
            <OuterDiv>
                {applications.map((application) => (
                    <EventCard  event_id={params.event_id} application_id={application}/>
                ))}
            </OuterDiv>
            <FooterDiv>
                {applications.length === 0 ? <Typography use='headline3'>No applications yet!</Typography> : <Typography use='headline3'>That's all for now!</Typography>}
                <Button 
                    raised 
                    style={{width: 200, height: 50, marginRight: '30px', backgroundColor: '#f44336'}}
                    onClick={() => history.push(`/checkEvent/${params.event_id}`)}
                >
                    Back
                </Button>
            </FooterDiv>

        </div>
    )
}
export default CheckApplications;