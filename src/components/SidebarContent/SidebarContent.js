import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SidebarContent.css';

const SidebarContent = ({ id, caption, onclick }) => {
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const [hover, setHover] = useState(false);
  const onMouseOver = () => setHover(prev => !prev);
  const onMouseLeave = () => setHover(prev => !prev);
  return (
    <div
      className='sidebarContent'
      onClick={() => onclick(id)}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor:
          (hover && (darkmode ? '#363a3f' : 'rgba(200, 200, 200, 0.3)')) ||
          'inherit',
      }}>
      {caption}
    </div>
  );
};

export default SidebarContent;
