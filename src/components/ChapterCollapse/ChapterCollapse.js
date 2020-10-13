import React, { useState } from 'react';
import './ChapterCollapse.css';

import toDate from '../../utils/toDate';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
const ChapterCollapse = ({ description, serverTimestamp }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(prev => !prev);

  return (
    <div className='chaperCollapse'>
      <button onClick={onClick}>
        {open ? <GoIssueClosed /> : <GoIssueOpened />}
      </button>
      {open && (
        <div className='chaperCollapse__itemCollapse'>
          <h4>description</h4>
          <span>{description}</span>
          <div className='chaperCollapse__time'>
            {toDate(serverTimestamp?.seconds, { all: true })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterCollapse;
