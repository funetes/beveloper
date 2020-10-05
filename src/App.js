import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import auth from './firebase/auth';

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Upload from './components/Upload/Upload';
import LectureUpload from './components/LectureUpload/LectureUpload';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import User from './components/User/User';

import { fatchLectures } from './action/lectureAction';

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = () => {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(darkOS);
  const lectures = useSelector(state => state.lectures);
  const dispatch = useDispatch();
  useEffect(() => {
    // user login, logout, create user, etc..
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // fire login action
        return setUser(authUser);
      } else {
        // fire logout action
        return setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fatchLectures());
  }, [dispatch]);

  useEffect(() => {
    if (checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [checked]);

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>beveloper</title>
        <link rel='canonical' href='https://beveloper.web.app' />
      </Helmet>
      <div className='app'>
        <Router>
          <Nav
            user={user}
            checked={checked}
            toggleDarkmodeChecked={() => setChecked(prev => !prev)}
          />
          <Switch>
            <Route exact path='/'>
              <Home lectures={lectures} />
            </Route>
            <Route exact path='/board'>
              <Board />
            </Route>
            <Route exact path='/contact'>
              <Contact checked={checked} />
            </Route>
            <Route path='/lecture/:id'>
              <Lecture user={user} />
            </Route>
            <Route exact path='/upload'>
              <Upload lectures={lectures} user={user} />
            </Route>
            <Route exact path='/upload/:id'>
              <LectureUpload />
            </Route>
            <Route exact path='/user'>
              <User user={user} setUser={setUser} />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
