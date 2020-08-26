import React from 'react';
import './LectureCard.css';
import { Link } from 'react-router-dom';
function LectureCard({ id, thumbnail, title, instructor, price }) {
  return (
    <div className='lectureCard'>
      <Link to={`/lecture/${id}`}>
        <img className='lectureCard___image' src={thumbnail} alt='' />
        <div className='lectureCard__container'>
          <h3>{title}</h3>
          <div>{instructor}</div>
          <span>{price}</span>
        </div>
      </Link>
    </div>
  );
}

export default LectureCard;
