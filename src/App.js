import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Admin from './components/Admin/Admin';
import Upload from './components/Upload/Upload';
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className='app'>
      <Router>
        <Nav setUser={setUser} user={user} />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/donetion'>
            후원
          </Route>
          <Route path='/lecture/:id'>
            <Lecture user={user} />
          </Route>
          <Route exact path='/admin'>
            <Admin />
          </Route>
          <Route exact path='/admin/upload'>
            <Upload />
          </Route>
          <Route exact path='/user'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
