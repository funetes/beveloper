import React from 'react';
import './SidebarContent.css';

const SidebarContent = ({ id, caption, onclick }) => {
  return (
    <div className='sidebarContent' onClick={() => onclick(id)}>
      {caption}
    </div>
  );
};

export default SidebarContent;
