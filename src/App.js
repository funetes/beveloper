import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        {/* nav */}
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
