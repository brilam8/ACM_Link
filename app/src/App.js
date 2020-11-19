import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
} from 'react-router-dom';
<<<<<<< HEAD
// import { route } from '../../server/functions/users';
import sampleComponent from './components/sampleComponent';
import sampleComponent2 from './components/sampleComponent2';
import loginComp from './components/loginComp';
import login from './components/login'
import settings from './components/settings';
import sampleComponent3 from './components/sampleComponent3';
import buttonPage from './components/buttonPageComponent';
import searchComponent from './components/searchComponent';
=======
import sampleComponent2 from './miscPages/sampleComponent2';
import loginComp from './profilePages/loginComp';
import login from './profilePages/login';
import settings from './components/settings';
import sampleComponent3 from './miscPages/sampleComponent3';
import buttonPage from './miscPages/buttonPageComponent';
>>>>>>> b771d76b09e9a116343e15aafe90de2f028446a8
import HamburgerMenuComponent from './components/hamburgerMenuComponent';
import resetPass from './profilePages/resetPass'
import createAccount from './profilePages/createAccount'
import applicationPage from './applicationPage/applicationPage';

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path='/' component={sampleComponent2} />
        <Route path='/test' component={sampleComponent} /> 
        <Route path='/login' component={loginComp} />
        {/* <Route path='/grabUsers' component={grabUsers} /> */}
        <Route exact path='/search' component={searchComponent} /> 
        <Route component={<div>Page not found</div>} />
        <Route exact path='/test' component={sampleComponent} /> 
        <Route exact path='/test2' component={sampleComponent3} /> 
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
        <Route component={() => <div>Page not found</div>} />
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
        <Route exact path='/test' component={sampleComponent3} /> 
        <Route exact path='/loginTest' component={loginComp} />
        <Route exact path='/settings' component={settings} />
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
        <Route exact path='/applicationPage/:UID/:event_id' component={applicationPage} />
        <Route exact path='/drawer' component={HamburgerMenuComponent} /> 
        <Route path='*' component={() => <div>Page not found</div>} />
      </Switch>
    </div>
);

export default App;
