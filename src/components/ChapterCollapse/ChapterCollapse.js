import React, { useState } from 'react';
import './ChapterCollapse.css';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const ChapterCollapse = ({ description, serverTimestamp }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(prev => !prev);
  };
  const toDate = ({ seconds }) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toLocaleString();
  };

  return (
    <div
      className='chaperCollapse'
      style={{ justifyContent: open ? 'space-between' : 'flex-start' }}>
      <button onClick={onClick}>
        {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </button>
      {open && (
        <div className='chaperCollapse__itemCollapse'>
          <div>description : {description}</div>
          <div>upload시간 : {toDate(serverTimestamp)}</div>
        </div>
      )}
    </div>
  );
};

export default ChapterCollapse;
