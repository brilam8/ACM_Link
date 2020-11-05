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
<<<<<<< HEAD
import searchComponent from './components/searchComponent';
// import searchComponent from './components/searchComponent';
=======
import hamburgerMenuComponent from './components/hamburgerMenuComponent';
>>>>>>> db57e228aa35fb408cdf1c40484af5b863e7d30b

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={sampleComponent2} />
        <Route path='/test' component={sampleComponent} /> 
        <Route path='/login' component={loginComp} />
        <Route path='/grabUsers' component={grabUsers} />
        <Route exact path='/test' component={sampleComponent} /> 
        <Route exact path='/test2' component={sampleComponent3} /> 
        <Route exact path='/search' component={searchComponent} /> 
        <Route exact path='/buttonPage/:UID/:firstName' component={buttonPage} /> 
<<<<<<< HEAD
        {/* <Route exact path='/search' component={searchComponent} />  */}
=======
        <Route exact path='/drawer' component={hamburgerMenuComponent} /> 
>>>>>>> db57e228aa35fb408cdf1c40484af5b863e7d30b
        <Route component={() => <div>Page not found</div>} />
      </Switch>
    </Router>
    
  );
}

export default App;
