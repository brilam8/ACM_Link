import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
} from 'react-router-dom';
//import { route } from '../../server/functions/users';
import sampleComponent from './components/sampleComponent';
import sampleComponent2 from './components/sampleComponent2';
import loginComp from './components/loginComp';
import login from './components/login'
import settings from './components/settings';
import sampleComponent3 from './components/sampleComponent3';
import buttonPage from './components/buttonPageComponent';
import HamburgerMenuComponent from './components/hamburgerMenuComponent';
import resetPass from './components/resetPass'
import createAccount from './components/createAccount'
import applicationComponent from './components/applicationComponent';
import createEvent from './components/createEvent'

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path='/' render={()=> <Redirect to="/login"/>} />
        <Route exact path='/login' component={login} />
        <Route exact path='/resetPassword' component={resetPass}/>
        <Route exact path='/createAccount' component={createAccount}/>
        <Route component={loggedIn} />
      </Switch>
    </Router>
    </div>
  );
}

const loggedIn = () => (
    <div>
      <HamburgerMenuComponent/>
      <Switch>
        <Route exact path='/homepage' component={sampleComponent2} /> 
        <Route exact path='/test2' component={sampleComponent} />
        <Route exact path='/test3' component={sampleComponent3} /> 
        <Route exact path='/loginTest' component={loginComp} />
        <Route exact path='/settings' component={settings} />
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
        <Route exact path='/applicationPage/:UID/:event_id' component={applicationComponent} />
        <Route exact path='/createEvent' component={createEvent} />
        <Route exact path='/drawer' component={HamburgerMenuComponent} /> 
        <Route path='*' component={() => <div>Page not found</div>} />
      </Switch>
    </div>
);

export default App;