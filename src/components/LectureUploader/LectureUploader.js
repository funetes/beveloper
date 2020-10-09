import React from 'react';
import LectureCollcapse from '../LectureCollcapse/LectureCollcapse';
import './LectureUploader.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const LectureUploader = () => {
  const lectures = useSelector(({ lectures: { lectures } }) => lectures);
  return (
    <section className='lectureUploader__container'>
      <h2>강의 list</h2>
      <ul className='lectureUploader__lectureList'>
        {lectures?.map(({ id, lecture }, index) => (
          <li className='lectureUploader__lecture' key={id}>
            <Link
              to={{
                pathname: `/admin/upload/${id}`,
                state: {
                  title: lecture.title,
                },
              }}
              className='lectureUploader__link'>
              {`${index + 1}. ${lecture.title}`}
            </Link>
            <LectureCollcapse lectureId={id} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LectureUploader;
