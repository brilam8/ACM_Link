import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from 'react-router-dom';
//import { route } from '../../server/functions/users';
import sampleComponent from './components/sampleComponent';
import sampleComponent2 from './components/sampleComponent2';
import loginComp from './components/loginComp';
import grabUsers from './components/grabUsers';
import sampleComponent3 from './components/sampleComponent3';
import buttonPage from './components/buttonPageComponent';
import HamburgerMenuComponent from './components/hamburgerMenuComponent';
import applicationComponent from './components/applicationComponent';

function App() {
  return (
    <div>
    <Router>
      <HamburgerMenuComponent/>
      <Switch>
        <Route exact path='/' component={sampleComponent2} />
        <Route exact path='/login' component={loginComp} />
        <Route exact path='/grabUsers' component={grabUsers} />
        <Route exact path='/test' component={sampleComponent} /> 
        <Route exact path='/test2' component={sampleComponent3} /> 
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} />
        <Route exact path='/applicationPage/:UID/:event_id' component={applicationComponent} />
        <Route exact path='/drawer' component={HamburgerMenuComponent} /> 
        <Route component={() => <div>Page not found</div>} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
