import React from 'react';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import LinkIcon from '@material-ui/icons/Link';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import Switch from '@material-ui/core/Switch';
import { logOut } from '../../action/userAction';
import SignModal from '../signModal/SignModal';

import { checkDarkmode } from '../../action/localAction';

const Nav = ({ user }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(({ local }) => local);
  const onChange = () => {
    darkmode ? dispatch(checkDarkmode(false)) : dispatch(checkDarkmode(true));
  };
  return (
    <header>
      <nav className='nav'>
        <div className='nav__linkContainer'>
          <Link to='/'>
            <img className='nav__logo' src={Logo} alt='logo' />
          </Link>
          <Switch color='primary' checked={darkmode} onChange={onChange} />
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
              <SignModal />
              <SignModal isSignUp />
            </>
          )}
          <Link to='/board' className='nav__link'>
            <AssignmentIcon />
          </Link>
          <Link to='/contact' className='nav__link'>
            <LinkIcon />
          </Link>
          {user && (
            <button
              className='nav__link'
              onClick={() => {
                dispatch(logOut());
              }}>
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
    </header>
  );
};

export default Nav;
