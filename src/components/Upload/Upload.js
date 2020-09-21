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
          {lectures.reverse().map(({ id, lecture }, index) => (
            <Link
              to={{
                pathname: `/upload/${id}`,
                state: {
                  title: lecture?.title,
                },
              }}
              className='upload__lecture'
              key={id}>
              {`${index + 1}. ${lecture.title}`}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Upload);
