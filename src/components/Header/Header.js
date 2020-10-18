import React, { useState, useEffect } from 'react';
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

import { checkDarkmode } from '../../action/localAction';

const Header = () => {
  const dispatch = useDispatch();
  const [hamburger, setHamburger] = useState(true);
  const [open, setOpen] = useState(false);
  const {
    local: { darkmode },
    user,
  } = useSelector(({ local, user }) => ({
    local,
    user,
  }));
  const onChange = () => {
    darkmode ? dispatch(checkDarkmode(false)) : dispatch(checkDarkmode(true));
  };
  const onClick = () => dispatch(logOut());

  const showButton = () => {
    if (window.innerWidth <= 576) {
      setHamburger(true);
    } else {
      setHamburger(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);
  const onHamburgerBtnClick = e => {
    console.log('clicked');
    setOpen(prev => !prev);
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
        <>
          <div className={open ? 'nav__mobile active' : 'nav__mobile'}>
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
        </>
      )}
    </header>
  );
};

export default Header;
