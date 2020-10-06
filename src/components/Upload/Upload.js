import React, { useEffect } from 'react';
import './Upload.css';
import { Link, withRouter } from 'react-router-dom';
import LectureCreator from '../LectureCreator/LectureCreator';
import LectureCollcapse from '../LectureCollcapse/LectureCollcapse';
import { useDispatch, useSelector } from 'react-redux';
const Upload = ({ history }) => {
  const { user, lectures } = useSelector(
    ({ user, lectures: { lectures } }) => ({
      user,
      lectures,
    })
  );
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

  return (
    <main className='upload'>
      <LectureCreator />
      <section className='upload__container'>
        <h2>강의 list</h2>
        <ul className='upload__lectureList'>
          {lectures?.map(({ id, lecture }, index) => (
            <li className='upload__lecture' key={id}>
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
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default withRouter(Upload);
