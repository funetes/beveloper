import React, { useState, useEffect } from 'react';
import './Upload.css';
import db from '../../firebase/db';
import LectureCreator from '../LectureCreator/LectureCreator';
function Upload() {
  // get lectures
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    const unsubscription = db.collection('lectures').onSnapshot(snapshot => {
      setLectures(
        snapshot.docs.map(doc => ({ id: doc.id, lecture: doc.data() }))
      );
    });
    return () => unsubscription();
  }, []);

  return (
    <div className='upload'>
      <LectureCreator />
      <ul>
        {lectures.map(({ id, lecture }) => (
          <li key={id}>{lecture.title}</li>
          // title을 클릭하면 해당 컴포넌트로 이동해야함
        ))}
      </ul>
    </div>
  );
}

export default Upload;
