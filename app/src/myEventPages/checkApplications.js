import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './applicantCard';
import styled from 'styled-components';
import { Typography } from '@rmwc/typography';
const OuterDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px;
`
const FooterDiv = styled.div`
    display: flex;
    justify-content: center;
`
const CheckApplications = () => {
    const params = useParams();
    const [applications, setApplications] = useState([]);
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
                    <EventCard  application_id={application}/>
                ))}
            </OuterDiv>
            <FooterDiv>
                {applications.length === 0 ? <Typography use='headline3'>No applications yet!</Typography> : <Typography use='headline3'>That's all for now!</Typography>}
            </FooterDiv>
        </div>
    )
}
export default CheckApplications;