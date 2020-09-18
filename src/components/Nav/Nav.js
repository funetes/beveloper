import React from 'react';
import './Nav.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import RedeemIcon from '@material-ui/icons/Redeem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TransitionsModal from '../TModal/TModal';
function Nav({
  user,
  signUp,
  signIn,
  logOut,
  signInOpen,
  signUpOpen,
  setSignUpOpen,
  setsignInOpen,
}) {
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
              open={signInOpen}
              setOpen={setsignInOpen}
              signIn={signIn}
            />
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
