import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';
import sampleComponent2 from './miscPages/sampleComponent2';
import loginComp from './profilePages/loginComp';
import login from './profilePages/login'
import sampleComponent3 from './miscPages/sampleComponent3';
import buttonPage from './miscPages/buttonPageComponent';
import HamburgerMenuComponent from './components/hamburgerMenuComponent';
import resetPass from './profilePages/resetPass'
import createAccount from './profilePages/createAccount'
import applicationPage from './applicationPage/applicationPage';

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route exact path='/' render={()=> <Redirect to="/login"/>} />
        <Route exact path='/login' component={login} />
        <Route component={loggedIn} />
      </Switch>
    </Router>
    </div>
  );
}

const loggedIn = () => (
    <div>
      <Router>
        <HamburgerMenuComponent/>
        <Switch>
          <Route exact path='/homepage' component={sampleComponent2} />
          <Route exact path='/test2' component={sampleComponent3} /> 
          <Route exact path='/loginTest' component={loginComp} />
          <Route exact path='/resetPassword' component={resetPass}/>
          <Route exact path='/createAccount' component={createAccount}/>
          <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
          <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} />
          <Route exact path='/applicationPage/:UID/:event_id' component={applicationPage} />
          <Route exact path='/drawer' component={HamburgerMenuComponent} /> 
          <Route path='*' component={() => <div>Page not found</div>} />
        </Switch>
      </Router>
    </div>
);

export default App;
