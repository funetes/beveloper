import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import './Nav.css';
function Nav() {
  return (
    <nav className='nav'>
      <img className='nav__logo' src={Logo} alt='logo' />
      <div className='nav__linkContainer'>
        <Link to='/'>course</Link>
        <Link to='/:id'>my course</Link>
        <Link to='/cart'>cart</Link>
      </div>
    </nav>
  );
}

export default Nav;
