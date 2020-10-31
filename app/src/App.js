import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from 'react-router-dom';
import sampleComponent from './components/sampleComponent';
import sampleComponent2 from './components/sampleComponent2';
import createEvent from './components/createEvent';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={sampleComponent2} />
        <Route path='/test' component={sampleComponent} />
        <Route path='/createevent' component={createEvent} />
        <Route component={<div>Page not found</div>} />
      </Switch>
    </Router>
    
  );
}

export default App;
