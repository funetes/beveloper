import React from 'react';
import LectureCollcapse from '../LectureCollcapse/LectureCollcapse';
import './LectureUploader.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const LectureUploader = () => {
  const lectures = useSelector(({ lecture: { lectures } }) => lectures);
  return (
    <section className='lectureUploader__container'>
      <h2>강의 list</h2>
      <ul className='lectureUploader__lectureList'>
        {lectures?.map(({ id, title }, index) => (
          <li className='lectureUploader__lecture' key={id}>
            <Link
              to={{
                pathname: `/admin/upload/${id}`,
                state: {
                  title,
                },
              }}
              className='lectureUploader__link'>
              {`${index + 1}. ${title}`}
            </Link>
            <LectureCollcapse lectureId={id} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LectureUploader;
