import React, { useState } from 'react';
import './ChapterCollapse.css';

import toDate from '../../utils/toDate';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRight from '@material-ui/icons/ArrowRight';
const ChapterCollapse = ({ description, serverTimestamp }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(prev => !prev);

  return (
    <div className='chaperCollapse'>
      <button onClick={onClick}>
        {open ? <ArrowDropUpIcon /> : <ArrowRight />}
      </button>
      {open && (
        <div className='chaperCollapse__itemCollapse'>
          <div>description : {description}</div>
          <div>
            upload시간 : {toDate(serverTimestamp?.seconds, { all: true })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterCollapse;
