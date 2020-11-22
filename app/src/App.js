import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  Redirect,
} from 'react-router-dom';
import sampleComponent2 from './miscPages/sampleComponent2';
import loginComp from './profilePages/loginComp';
import login from './profilePages/login';
import settings from './components/settings';
import sampleComponent3 from './miscPages/sampleComponent3';
import buttonPage from './miscPages/buttonPageComponent';
import HamburgerMenuComponent from './components/hamburgerMenuComponent';
import searchComponent from './applicationPage/searchComponent';
import resetPass from './profilePages/resetPass';
import createAccount from './profilePages/createAccount';
import applicationComponent from './applicationPage/applicationPage';
import createEvent from './myEventPages/createEvent';
import homepageComponent from './components/homepageComponents';
import myEvents from './myEventPages/myEvents';
import checkEvent from './myEventPages/checkEvent'

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
        <Route exact path='/homepage' component={homepageComponent} /> 
        <Route exact path='/test' component={sampleComponent3} /> 
        <Route exact path='/loginTest' component={loginComp} />
        <Route exact path='/settings' component={settings} />
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
        <Route exact path='/applicationPage/:UID/:event_id' component={applicationComponent} />
        <Route exact path='/createEvent' component={createEvent} />
        <Route exact path='/myEvents' component={myEvents} />
        <Route exact path='/checkEvent/:event_id' component={checkEvent} />
        <Route exact path='/drawer' component={HamburgerMenuComponent} /> 
        <Route exact path='/search' component={searchComponent}/>
        <Route path='*' component={() => <div>Page not found</div>} />
      </Switch>
    </div>
);

export default App;