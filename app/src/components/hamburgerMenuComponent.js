import React, {useEffect, useState} from 'react';
import {Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list'
import {Button} from '@rmwc/button'
import MenuIcon from '@material-ui/icons/Menu'
import '@rmwc/drawer/styles';
import '@rmwc/button/styles';
import '@rmwc/list/styles';
import styled from 'styled-components';
import {Link, useHistory, Redirect } from 'react-router-dom';
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
            <Link to={`/test`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
              <ListItem>Search for Posts</ListItem>
            </Link>
            <Link to={`/test2`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
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
      'color': 'white',
      'margin-left': '4%',
    }}>
      Teammate Finder
    </Typography>

    <Typography use='headline4' style={{
      'font-family': 'Nunito',
      'color': 'white',
      'margin-right': '4%',
    }}>
      acm
    </Typography>
  </Div1>  
    
  )
}



export default HamburgerMenu;