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
  toggleChecked,
  onGoogleLoginBtnClick,
}) => {
  return (
    <nav className='nav'>
      <div className='nav__linkContainer'>
        <Link to='/'>
          <img className='nav__logo' src={Logo} alt='logo' />
        </Link>
        <Switch
          className='nav__link'
          color='primary'
          checked={checked}
          onChange={toggleChecked}>
          darkmode
        </Switch>
      </div>
      <div className='nav__linkContainer'>
        {user ? (
          <>
            <div className='nav__displayName'>
              반갑습니다. <span>{user.displayName}</span> 님!
            </div>
            {user && (
              <Link to='/user' className='nav__link'>
                <PersonIcon />
              </Link>
            )}
          </>
        ) : (
          <>
            <TransitionsModal
              open={sign.signInOpen}
              setOpen={sign.setsignInOpen}
              signIn={sign.signIn}
              onGoogleLoginBtnClick={onGoogleLoginBtnClick}
            />
            <TransitionsModal
              open={sign.signUpOpen}
              setOpen={sign.setSignUpOpen}
              isSignUp
              signUp={sign.signUp}
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
            Log out
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
