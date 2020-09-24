import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import db from './firebase/db';
import auth from './firebase/auth';

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Upload from './components/Upload/Upload';
import LectureUpload from './components/LectureUpload/LectureUpload';
import Board from './components/Board/Board';
import Contact from './components/Contact/Contact';

const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = () => {
  const [user, setUser] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [signInOpen, setsignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [checked, setChecked] = useState(darkOS);
  useEffect(() => {
    // user login, logout, create user, etc..
    const unsubscribe = auth.onAuthStateChanged(authUser =>
      authUser ? setUser(authUser) : setUser(null)
    );
    return () => unsubscribe();
  });

  useEffect(() => {
    const unsubscription = db
      .collection('lectures')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        console.log('app/lectures');
        setLectures(
          snapshot.docs.map(doc => ({ id: doc.id, lecture: doc.data() }))
        );
      });
    return () => unsubscription();
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

  const signUp = (email, password, username) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser =>
        authUser.user.updateProfile({
          displayName: username,
        })
      )
      .catch(error => alert(error.message)); // 모달로 보내서 표현하기
    setSignUpOpen(false);
  };
  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
    setsignInOpen(false);
  };
  const logOut = () => {
    auth.signOut().then(_ => setUser(null));
  };
  const toggleChecked = () => {
    setChecked(prev => !prev);
  };
  return (
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
            setsignInOpen,
          }}
          checked={checked}
          toggleChecked={toggleChecked}
        />
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
            {/* user component */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
