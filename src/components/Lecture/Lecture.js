import React from 'react';
import './Lecture.css';
import { useParams } from 'react-router-dom';
function Lecture() {
  const { id } = useParams();
  return (
    <div className='lecture'>
      {/* sidebar */}
      {/* video */}
    </div>
  );
}

export default Lecture;
