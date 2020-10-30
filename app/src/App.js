import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from 'react-router-dom';
import sampleComponent from './components/sampleComponent';
import sampleComponent2 from './components/sampleComponent2';
import loginComp from './components/loginComp';
import grabUsers from './components/grabUsers';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={sampleComponent2} />
        <Route path='/test' component={sampleComponent} /> 
        <Route path='/login' component={loginComp} />
        <Route path='/grabUsers' component={grabUsers} />
        <Route component={<div>Page not found</div>} />
      </Switch>
    </Router>
    
  );
}

export default App;
