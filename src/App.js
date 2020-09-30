import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
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

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = () => {
  const [user, setUser] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [checked, setChecked] = useState(darkOS);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // user login, logout, create user, etc..
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        return setUser(authUser);
      } else {
        return setUser(null);
      }
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    const getLectures = async () => {
      try {
        setLoading(true);
        const result = db
          .collection('lectures')
          .orderBy('timestamp', 'desc')
          .get();
        const lectures = (await result).docs.map(doc => ({
          id: doc.id,
          lecture: doc.data(),
        }));
        setLectures(lectures);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getLectures();
  }, []);

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

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setSignInOpen(false);
    }
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
      alert(error.message);
    } finally {
      setSignInOpen(false);
      setSignUpOpen(false);
    }
  };

  const logOut = async () => {
    await auth.signOut();
    setUser(null);
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
              signUp,
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
              <Home lectures={lectures} loading={loading} />
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
              <User user={user} />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
