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
import { checkDarkmode } from './action/localAction';

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const getDarkModeFromLocalStorage = () => {
  let darkmode = false;
  if (localStorage.getItem('darkmode')) {
    darkmode = JSON.parse(localStorage.getItem('darkmode'));
  } else {
    localStorage.setItem('darkmode', darkOS);
    darkmode = darkOS;
  }
  return darkmode;
};

const App = () => {
  const [user, setUser] = useState(null);
  const { lectures, darkmode } = useSelector(
    ({ lectures, local: { darkmode } }) => ({
      lectures,
      darkmode,
    })
  );
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
    dispatch(checkDarkmode(getDarkModeFromLocalStorage()));
  }, [dispatch]);

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkmode]);

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>beveloper</title>
        <link rel='canonical' href='https://beveloper.web.app' />
      </Helmet>
      <div className='app'>
        <Router>
          <Nav user={user} />
          <Switch>
            <Route exact path='/'>
              <Home lectures={lectures} />
            </Route>
            <Route exact path='/board'>
              <Board />
            </Route>
            <Route exact path='/contact'>
              <Contact />
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
