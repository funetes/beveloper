import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import auth from './firebase/auth';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Upload from './components/Upload/Upload';
import LectureUpload from './components/LectureUpload/LectureUpload';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Authority from './components/Authority/Authority';

import { fatchLectures } from './action/lectureAction';
import { checkDarkmode } from './action/localAction';
import { userInfo, userInfoFB } from './action/userAction';

import darkmodeInit from './utils/darkmodeInit';

const App = () => {
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(userInfo(authUser));
        dispatch(userInfoFB(authUser.uid));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fatchLectures());
    dispatch(checkDarkmode(darkmodeInit()));
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
        <title>Beveloper</title>
        <link rel='canonical' href='https://beveloper.web.app' />
      </Helmet>
      <div className='app'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/user' component={User} />
            <Route exact path='/board' component={Board} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/lecture/:id' component={Lecture} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/admin/authority' component={Authority} />
            <Route exact path='/admin/upload/:id' component={LectureUpload} />
            <Route exact path='/admin/upload' component={Upload} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
