import React from 'react';
import './SidebarContent.css';
function SidebarContent({ id, caption, onclick }) {
  return (
    <div className='sidebarContent' onClick={() => onclick(id)}>
      {caption}
    </div>
  );
}

export default SidebarContent;
