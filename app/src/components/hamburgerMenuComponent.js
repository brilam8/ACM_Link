import React, {useEffect, useState} from 'react';
import {Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list'
import {Button} from '@rmwc/button'
import MenuIcon from '@material-ui/icons/Menu'
import '@rmwc/drawer/styles';
import '@rmwc/button/styles';
import '@rmwc/list/styles';

function HamburgerMenu () {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button 
        onClick={()=>{setOpen(!open)}} 
      ><MenuIcon/></Button>
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
            <ListItem>Homepage</ListItem>
            <ListItem>Search for Posts</ListItem>
            <ListItem>My Posts</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default HamburgerMenu;