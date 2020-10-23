import React, { useEffect } from 'react';
import './Header.css';
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
import { GiHamburgerMenu } from 'react-icons/gi';

import {
  checkDarkmode,
  hamburgerIcon,
  navToggle,
} from '../../action/localAction';
const Header = () => {
  const dispatch = useDispatch();
  const smallNav = useSelector(({ local: { smallNav } }) => smallNav);
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const hamburger = useSelector(({ local: { hamburger } }) => hamburger);
  const user = useSelector(({ user }) => user);
  const onChange = () => {
    darkmode ? dispatch(checkDarkmode(false)) : dispatch(checkDarkmode(true));
  };
  const onClick = () => dispatch(logOut());

  useEffect(() => {
    const showButton = () => {
      if (window.innerWidth <= 576) {
        dispatch(hamburgerIcon(true));
      } else {
        dispatch(hamburgerIcon(false));
      }
    };
    window.addEventListener('resize', showButton);
    showButton();
    return () => window.removeEventListener('resize', showButton);
  }, [dispatch]);
  const onHamburgerBtnClick = () => {
    if (smallNav) {
      dispatch(navToggle(false));
    } else {
      dispatch(navToggle(true));
    }
  };
  return (
    <header style={{ backgroundColor: darkmode ? '#333333' : 'inherit' }}>
      <nav className='nav'>
        <div className='nav__linkContainer'>
          <Link to='/'>
            <img
              className='nav__logo'
              src={Logo}
              alt='logo'
              style={{ backgroundColor: darkmode ? 'darkgray' : 'transparent' }}
            />
          </Link>
          <Switch color='primary' checked={darkmode} onChange={onChange} />
        </div>
        {hamburger ? (
          <button className='nav__hamburgerBtn' onClick={onHamburgerBtnClick}>
            <GiHamburgerMenu />
          </button>
        ) : (
          <div className={!hamburger && 'nav__linkContainer'}>
            {user?.uid ? (
              <>
                {user.displayName && (
                  <div className='nav__displayName'>
                    반갑습니다. <span>{user.displayName}</span> 님!
                  </div>
                )}
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
            {user?.uid && (
              <button className='nav__link' onClick={onClick}>
                Log Out
              </button>
            )}
            {user?.admin && (
              <Link to='/admin' className='nav__link'>
                <SupervisorAccountIcon />
              </Link>
            )}
          </div>
        )}
      </nav>
      {hamburger && (
        <div
          className={smallNav ? 'nav__mobile navbarActive' : 'nav__mobile'}
          style={{ backgroundColor: darkmode ? '#2f3135' : '#E6E6E6' }}>
          {user?.uid ? (
            <>
              {user.displayName && (
                <div className='nav__displayName'>
                  반갑습니다. <span>{user.displayName}</span> 님!
                </div>
              )}
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
          {user?.uid && (
            <button className='nav__link' onClick={onClick}>
              Log Out
            </button>
          )}
          {user?.admin && (
            <Link to='/admin' className='nav__link'>
              <SupervisorAccountIcon />
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
