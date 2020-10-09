import React from 'react';
import './Upload.css';
import LectureCreator from '../LectureCreator/LectureCreator';
import LectureUploader from '../LectureUploader/LectureUploader';
const Upload = () => {
  return (
    <main className='upload'>
      <LectureCreator />
      <LectureUploader />
    </main>
  );
};

export default Upload;
