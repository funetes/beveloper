import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Nav from './components/Nav/Nav';
function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/cart'>장바구니</Route>
          <Route path='/lecture/:id'>
            <Lecture />
          </Route>
          <Route path='/:id'>user Page</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
