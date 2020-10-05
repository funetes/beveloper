import React, { useEffect } from 'react';
import './Upload.css';
import { Link, withRouter } from 'react-router-dom';

import LectureCreator from '../LectureCreator/LectureCreator';
import LectureCollcapse from '../LectureCollcapse/LectureCollcapse';

const Upload = ({ lectures: { lectures }, user, history }) => {
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

  return (
    <main className='upload'>
      <LectureCreator />
      <section className='upload__container'>
        <h2>강의 list</h2>
        <ul className='upload__lectureList'>
          {lectures.reverse().map(({ id, lecture }, index) => (
            <div className='upload__lecture' key={id}>
              <Link
                to={{
                  pathname: `/upload/${id}`,
                  state: {
                    title: lecture?.title,
                  },
                }}
                className='upload__link'>
                {`${index + 1}. ${lecture?.title}`}
              </Link>
              <LectureCollcapse lectureId={id} />
            </div>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default withRouter(Upload);
