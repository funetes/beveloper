import React from 'react';
import './LectureCard.css';
import { Link } from 'react-router-dom';
function LectureCard({ id, thumbnail, title, instructor, description }) {
  return (
    <div className='lectureCard'>
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
        <img className='lectureCard___image' src={thumbnail} alt='' />
        <div className='lectureCard__container'>
          <h3>{title}</h3>
          <div>{instructor}</div>
        </div>
      </Link>
    </div>
  );
}

export default LectureCard;
