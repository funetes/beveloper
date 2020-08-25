import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            main - course
          </Route>
          <Route path='/:id'>user Page</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
