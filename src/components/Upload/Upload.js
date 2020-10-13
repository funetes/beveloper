import React from 'react';
import './Upload.css';
import { withRouter } from 'react-router-dom';
import LectureCreator from '../LectureCreator/LectureCreator';
import LectureUploader from '../LectureUploader/LectureUploader';
import { BiArrowBack } from 'react-icons/bi';
const Upload = ({ history }) => {
  return (
    <main className='upload'>
      <div className='upload__titleWrapper'>
        <h1>강의 업로드</h1>
        <button onClick={history.goBack}>
          <BiArrowBack />
        </button>
      </div>
      <div className='upload__wrapper'>
        <LectureCreator />
        <LectureUploader />
      </div>
    </main>
  );
};

export default withRouter(Upload);
