import React from 'react';
import './Nav.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import RedeemIcon from '@material-ui/icons/Redeem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TransitionsModal from '../TModal/TModal';
const Nav = ({ user, logOut, sign }) => {
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
            <TransitionsModal
              open={sign.signInOpen}
              setOpen={sign.setsignInOpen}
              signIn={sign.signIn}
            />
            <TransitionsModal
              open={sign.signUpOpen}
              setOpen={sign.setSignUpOpen}
              isSignUp
              signUp={sign.signUp}
            />
          </>
        )}
        <Link to='/donetion' className='nav__link'>
          <RedeemIcon />
        </Link>
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
