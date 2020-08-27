import React, { useState } from 'react';
import './Nav.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import RedeemIcon from '@material-ui/icons/Redeem';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TransitionsModal from '../TModal/TModal';
function Nav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  // user 로그인 상황에따라 nav에서 보여주는것이 달라야한다.
  // user가 없으면 login, sign up component render
  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__logo' src={Logo} alt='logo' />
      </Link>
      <div className='nav__linkContainer'>
        {user ? (
          'logout'
        ) : (
          <>
            <div className='nav__link'>
              <TransitionsModal open={open} setOpen={setOpen} />
            </div>
            <div className='nav__link'>
              <TransitionsModal
                open={open}
                setOpen={setOpen}
              />
            </div>
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
