import React, {useState, useEffect} from 'react';
import {Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list'
import {Button} from '@rmwc/button'
import MenuIcon from '@material-ui/icons/Menu'
import '@rmwc/drawer/styles';
import '@rmwc/button/styles';
import '@rmwc/list/styles';
import styled from 'styled-components';
import {Link, useHistory, useLocation } from 'react-router-dom';
import {Typography} from '@rmwc/typography';
import firebase from '../firebase';

const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  height: 8vh;
`;


function HamburgerMenu () {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState('');

  //gets current route
  let location = useLocation();

  //gets the page name and sets the header accordingly
  useEffect(() => {
    console.log(`props passed in is: ${location.pathname}`);

    //add a case statement if you want your page to be named something besides your path
    switch(location.pathname.split('/')[1]){
      case "homepage":
        setPageName('Home Page');
        break;
      case "settings":
        setPageName('Settings');
        break;
      case "createEvent":
        setPageName('Create Event');
        break;
      case "myEvents":
        setPageName('My Events');
        break;
      case "checkEvent":
        setPageName('View Event')
        break;
      case "search":
        setPageName('Search Events')
        break;
      case "applicationPage":
        setPageName("Apply!")
        break;
      case "checkApplications":
        setPageName("View Your Applicants")
        break;
      //defaults to making your path the page name
      default:
        const title = location.pathname.slice(1);
        setPageName(title);
    }
  }, [location]);

  function handleLogout () {
    firebase.auth().signOut().then(async function(){
      setOpen(false);
      history.push('/login')
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  return (
    <Div1>
    <div>
      <Button 
        onClick={()=>{setOpen(!open)}} 
      >
      <MenuIcon style={{'color': 'white'}}/>
      </Button>
      <Drawer 
        modal open={open} 
        onClose={() => {setOpen(false)}}
      >  
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerSubtitle></DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
        <List>
            <Link to={`/homepage`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <ListItem>Homepage</ListItem>
            </Link>
            <Link to={`/search`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <ListItem>Search for Posts</ListItem>
            </Link>
            <Link to={`/myEvents`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <ListItem>My Posts</ListItem>
            </Link>
            <Link to={`/settings`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <ListItem>Settings</ListItem>
            </Link>
            <ListItem onClick={() => handleLogout()}>Log Out</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    </div>
    
    <Typography use='headline5' style={{
      color: 'white',
      marginLeft: '4%',
    }}>
      {pageName}
    </Typography>

    <Typography use='headline4' style={{
      fontFamily: 'Nunito',
      color: 'white',
      marginRight: '4%',
    }}>
      acm
    </Typography>
  </Div1>  
    
  )
}



export default HamburgerMenu;