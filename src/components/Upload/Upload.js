import React from 'react';
import './Upload.css';
import LectureCreator from '../LectureCreator/LectureCreator';
import { Link } from 'react-router-dom';
function Upload({ lectures }) {
  return (
    <div className='upload'>
      <LectureCreator />
      <ul className='upload__lectureList'>
        {lectures.map(({ id, lecture }) => (
          <Link to={`/admin/upload/${id}`} key={id}>
            {lecture.title}
          </Link>
          // title을 클릭하면 해당 컴포넌트로 이동해야함
        ))}
      </ul>
    </div>
  );
}

export default Upload;
