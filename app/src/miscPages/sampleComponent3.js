import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '@rmwc/card/styles';
import EventCard from '../components/eventCardComponent';


function ButtonArray() {
  
  const [buttons, setButtons] = useState([]);

  async function fetchUsers() {
    const response = await fetch('/users');
    const json = await response.json();
    console.log(json);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  useEffect(()=>{
    fetchUsers();
  }, []);
  
  return (
    <div>
      <link 
        href="https://fonts.googleapis.com/icon?family=Material+Icons" 
        rel="stylesheet"
      />
      <div>
        {buttons.map((user) => (
            <Link to={`/buttonPage/${user.user_id}/${user.firstName}`}>
              <Button>
                {user.firstName}
              </Button>
            </Link>
          ))}
      </div>

      <EventCard 
        user_id='6PRMGwVGACILQwTnbIHC'
        event_id='JIpVqouZna0LtTv9jFUN'
      />
    </div>
  ); 
}

export default ButtonArray;