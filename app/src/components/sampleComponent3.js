import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'; 

function ButtonArray() {
  
  const [buttons, setButtons] = useState([]);

  async function fetchUsers() {
    const response = await fetch('/users');
    const json = await response.json();
    console.log(json);
    //setButtons(buttons => [...buttons, json]);
    setButtons(buttons.concat(json));
    console.log(buttons);
  }

  useEffect(()=>{
    fetchUsers();
  }, []);
  
  return (
    <div>
      {buttons.map((user) => {
        return (
          <Link to={`/buttonPage/${user.user_id}/${user.firstName}`}>
            <Button>
              {user.firstName}
            </Button>
          </Link>
        );
      })}
    </div>
  );
  
}

export default ButtonArray;