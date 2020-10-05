import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import db from './firebase/db';
import auth from './firebase/auth';
import firebase from 'firebase';

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Upload from './components/Upload/Upload';
import LectureUpload from './components/LectureUpload/LectureUpload';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';
import User from './components/User/User';

import { errorMsg } from './utils/errorMsg';

import { loginUser, signupUser } from './action/userAction';
import { fatchLectures } from './action/lectureAction';

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = ({ loginUser, signupUser, fatchLectures, lectures }) => {
  const [user, setUser] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [checked, setChecked] = useState(darkOS);

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
    fatchLectures();
  }, [fatchLectures]);

  useEffect(() => {
    if (checked) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [checked]);

  const signUp = async (email, password, username) => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await authUser.user.updateProfile({
        displayName: username,
      });
      // store to firestore
      storeToFirestore(authUser.user.uid);
    } catch (error) {
      alert(error.message);
    } finally {
      setSignUpOpen(false);
    }
  };

  const signIn = (email, password) => {
    loginUser(email, password);
    setSignInOpen(false);
  };

  const onProviderLoginBtnClick = async provider => {
    let authProvider;
    if (provider === 'google') {
      authProvider = new firebase.auth.GoogleAuthProvider();
    } else if (provider === 'github') {
      authProvider = new firebase.auth.GithubAuthProvider();
    }
    try {
      const result = await firebase.auth().signInWithPopup(authProvider);
      const { user } = result;
      const isInFireStore = await db.collection('users').doc(user.uid).get();
      !isInFireStore.data() && storeToFirestore(user.uid);
    } catch (error) {
      if (error.message === errorMsg.closePopup) {
        return;
      }
      alert(error.message);
    }
  };

  const logOut = async () => {
    await auth.signOut();
    setUser(null);
    setSignInOpen(false);
    setSignUpOpen(false);
  };

  const storeToFirestore = async uid => {
    try {
      await db.collection('users').doc(uid).set({
        favorites: [],
      });
    } catch (error) {
      console.error(error.message);
    }
  };
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
            logOut={logOut}
            sign={{
              signupUser,
              signIn,
              signInOpen,
              signUpOpen,
              setSignUpOpen,
              setSignInOpen,
            }}
            checked={checked}
            onProviderLoginBtnClick={onProviderLoginBtnClick}
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
const mapStateToProps = state => ({
  user: state.user,
  lectures: state.lectures,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  fatchLectures: () => dispatch(fatchLectures()),
  signupUser: (email, password, username) =>
    dispatch(signupUser(email, password, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
