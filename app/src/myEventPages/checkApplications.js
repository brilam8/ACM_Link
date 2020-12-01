import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './applicantCard';
import styled from 'styled-components';

const OuterDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
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

            </OuterDiv>
        </div>
    )
}
export default CheckApplications;