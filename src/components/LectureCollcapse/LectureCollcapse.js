import React, { useState } from 'react';
import './LectureCollcapse.css';
import EditInput from '../EditInput/EditInput';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const LectureCollcapse = ({ lectureId }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => setOpen(prevs => !prevs);
  return (
    <>
      <button
        className='lectureCollcapseBtn'
        variant='contained'
        color='primary'
        onClick={onClick}>
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </button>
      {open && <EditInput lectureId={lectureId} />}
    </>
  );
};

export default LectureCollcapse;
