import React, {useState} from 'react';
import {Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list'
import {Button} from '@rmwc/button'
import MenuIcon from '@material-ui/icons/Menu'
import '@rmwc/drawer/styles';
import '@rmwc/button/styles';
import '@rmwc/list/styles';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Typography} from '@rmwc/typography';


const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  height: 8vh;
`;

function HamburgerMenu () {
  const [open, setOpen] = useState(false);

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
            <ListItem>Log Out</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    </div>
    
    <Typography use='headline5' style={{
      color: 'white',
      marginLeft: '4%',
    }}>
      Teammate Finder
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