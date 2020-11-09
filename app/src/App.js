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
import login from './components/login'
import grabUsers from './components/grabUsers';
import sampleComponent3 from './components/sampleComponent3';
import buttonPage from './components/buttonPageComponent';
import resetPass from './components/resetPass'
import createAccount from './components/createAccount'
import applicationComponent from './components/applicationComponent';
import hamburgerMenuComponent from './components/hamburgerMenuComponent';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={login} />
        <Route exact path='/test' component={sampleComponent} /> 
        <Route exact path='/test2' component={sampleComponent2} />
        <Route exact path='/test3' component={sampleComponent3} /> 
        <Route exact path='/loginTest' component={loginComp} />
        <Route exact path='/resetPassword' component={resetPass}/>
        <Route exact path='/createAccount' component={createAccount}/>
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} />
        <Route exact path='/applicationPage/:UID/:event_id' component={applicationComponent} />
        <Route exact path='/drawer' component={hamburgerMenuComponent} /> 
        <Route component={() => <div>Page not found</div>} />
      </Switch>
    </Router>
  );
}

export default App;
