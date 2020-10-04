import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

import Logo from '../../assets/img/logo.png';
import LinkIcon from '@material-ui/icons/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import Switch from '@material-ui/core/Switch';

import TransitionsModal from '../TModal/TModal';

const Nav = ({
  user,
  logOut,
  sign,
  checked,
  toggleDarkmodeChecked,
  onProviderLoginBtnClick,
}) => {
  return (
    <nav className='nav'>
      <div className='nav__linkContainer'>
        <Link to='/'>
          <img className='nav__logo' src={Logo} alt='logo' />
        </Link>
        <Switch
          color='primary'
          checked={checked}
          onChange={toggleDarkmodeChecked}
        />
      </div>
      <div className='nav__linkContainer'>
        {user ? (
          <>
            <div className='nav__displayName'>
              반갑습니다. <span>{user.displayName}</span> 님!
            </div>
            <Link to='/user' className='nav__link'>
              {user.photoURL ? (
                <img src={`${user.photoURL}`} alt='avatar' />
              ) : (
                <PersonIcon />
              )}
            </Link>
          </>
        ) : (
          <>
            <TransitionsModal
              open={sign.signInOpen}
              setOpen={sign.setSignInOpen}
              signIn={sign.signIn}
              onProviderLoginBtnClick={onProviderLoginBtnClick}
            />
            <TransitionsModal
              open={sign.signUpOpen}
              setOpen={sign.setSignUpOpen}
              isSignUp
              signUp={sign.signUp}
              onProviderLoginBtnClick={onProviderLoginBtnClick}
            />
          </>
        )}
        <Link to='/board' className='nav__link'>
          <AssignmentIcon />
        </Link>
        <Link to='/contact' className='nav__link'>
          <LinkIcon />
        </Link>
        {user && (
          <button className='nav__link' onClick={logOut}>
            Log Out
          </button>
        )}
        {user?.uid === process.env.REACT_APP_ADMIN && (
          <Link to='/upload' className='nav__link'>
            <SupervisorAccountIcon />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
