import React, {useEffect, useState} from 'react';
import {Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list'
import {Button} from '@rmwc/button'
import MenuIcon from '@material-ui/icons/Menu'
import '@rmwc/drawer/styles';
import '@rmwc/button/styles';
import '@rmwc/list/styles';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function HamburgerMenu () {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button 
        onClick={()=>{setOpen(!open)}} 
      >
        <MenuIcon/>
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
            <Link to={`/`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
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
  )
}

export default HamburgerMenu;