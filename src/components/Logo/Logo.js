import React from 'react';
import './Logo.css';
import logo from '../../assets/img/logo.png';
function Logo() {
  return (
    <div className='logo'>
      <img className='logo__img' src={logo} alt='' />
    </div>
  );
}

export default Logo;
