import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Nav from './components/Nav/Nav';
function App() {
  return (
    <div className='app'>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/donetion'>후원</Route>
          <Route path='/lecture/:id'>
            <Lecture />
          </Route>
          <Route path='/admin'>admin Page</Route>
          <Route path='/user'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
