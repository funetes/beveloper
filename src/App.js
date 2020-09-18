import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import db from './firebase/db';
import auth from './firebase/auth';

import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Lecture from './components/Lecture/Lecture';
import Admin from './components/Admin/Admin';
import Upload from './components/Upload/Upload';
import LectureUpload from './components/LectureUpload/LectureUpload';
function App() {
  const [user, setUser] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [signInOpen, setsignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    // user login, logout, create user, etc..
    const unsubscribe = auth.onAuthStateChanged(authUser =>
      authUser ? setUser(authUser) : setUser(null)
    );
    return () => unsubscribe();
  });

  useEffect(() => {
    const unsubscription = db.collection('lectures').onSnapshot(snapshot => {
      console.log('app/lectures');
      setLectures(
        snapshot.docs.map(doc => ({ id: doc.id, lecture: doc.data() }))
      );
    });
    return () => unsubscription();
  }, []);

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
  const logOut = () => auth.signOut();
  return (
    <div className='app'>
      <Router>
        <Nav
          user={user}
          signUp={signUp}
          signIn={signIn}
          logOut={logOut}
          signInOpen={signInOpen}
          signUpOpen={signUpOpen}
          setSignUpOpen={setSignUpOpen}
          setsignInOpen={setsignInOpen}
        />
        <Switch>
          <Route exact path='/'>
            <Home lectures={lectures} />
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
            <Upload lectures={lectures} />
          </Route>
          <Route exact path='/admin/upload/:id'>
            <LectureUpload />
          </Route>
          <Route exact path='/user'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
