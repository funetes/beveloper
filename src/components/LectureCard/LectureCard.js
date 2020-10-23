import React from 'react';
import './LectureCard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const LectureCard = ({ id, thumbnail, title, instructor, description }) => {
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  return (
    <section
      className='lectureCard'
      style={{ backgroundColor: darkmode ? '#333333' : 'inherit' }}>
      <Link
        to={{
          pathname: `/lecture/${id}`,
          state: {
            thumbnail,
            title,
            instructor,
            description,
          },
        }}>
        <img className='lectureCard___image' src={thumbnail} alt='thumbnail' />
        <div className='lectureCard__container'>
          <h3>{title}</h3>
          <div>{instructor}</div>
        </div>
      </Link>
    </section>
  );
};

export default LectureCard;
