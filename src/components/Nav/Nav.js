import React, { useState, useEffect } from 'react';
import './Nav.css';
import auth from '../../firebase/auth';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import RedeemIcon from '@material-ui/icons/Redeem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TransitionsModal from '../TModal/TModal';
function Nav({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    // user login, logout, create user, etc..
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log('onAuthStateChanged');
      if (authUser) {
        // logged in
        console.log('login');
        setUser(authUser);
      } else {
        // logged out
        console.log('logout');
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email, password, username) => {
    console.log(email, password, username);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch(error => alert(error.message)); // 모달로 보내서 표현하기
  };
  const signIn = (email, password) => {
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
    setOpen(false);
  };

  const logOut = () => auth.signOut();
  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__logo' src={Logo} alt='logo' />
      </Link>
      <div className='nav__linkContainer'>
        {user ? (
          <button className='nav__link' onClick={logOut}>
            Log out
          </button>
        ) : (
          <>
            <TransitionsModal open={open} setOpen={setOpen} signIn={signIn} />
            <TransitionsModal
              open={signUpOpen}
              setOpen={setSignUpOpen}
              isSignUp
              signUp={signUp}
            />
          </>
        )}
        <Link to='/donetion' className='nav__link'>
          <RedeemIcon />
        </Link>
        <Link to='/admin' className='nav__link'>
          <SupervisorAccountIcon />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
