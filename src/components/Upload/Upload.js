import React, { useEffect } from 'react';
import './Upload.css';
import LectureCreator from '../LectureCreator/LectureCreator';
import { Link, withRouter } from 'react-router-dom';
const Upload = ({ lectures, user, history }) => {
  useEffect(() => {
    !user && history.push('/');
  }, [user]);
  return (
    <div className='upload'>
      <LectureCreator />
      <div className='upload__container'>
        <h2>강의 list</h2>
        <ul className='upload__lectureList'>
          {lectures.map(({ id, lecture }) => (
            <Link
              to={{
                pathname: `/upload/${id}`,
                state: {
                  title: lecture?.title,
                },
              }}
              className='upload__lecture'
              key={id}>
              {`${lecture.title}`}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Upload);
