import React from 'react';
import './IconButton.css';
const IconButton = ({ Icon, onClick }) => {
  return (
    <button onClick={onClick} className='iconButton'>
      <Icon />
    </button>
  );
};

export default IconButton;
