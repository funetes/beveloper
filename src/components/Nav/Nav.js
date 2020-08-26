import React from 'react';
import './Nav.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
function Nav() {
  // user 로그인 상황에따라 nav에서 보여주는것이 달라야한다.
  // user가 없으면 login, sign up component render
  return (
    <nav className='nav'>
      <Link to='/'>
        <img className='nav__logo' src={Logo} alt='logo' />
      </Link>
      <div className='nav__linkContainer'>
        <Link to='/:id' className='nav__link'>
          <PersonIcon />
        </Link>
        <Link to='/cart' className='nav__link'>
          <ShoppingCartIcon />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
