import React from 'react';
import './LectureCard.css';
function LectureCard({ img, title, instructor, price }) {
  return (
    <div className='lectureCard'>
      <img className='lectureCard___image' src={img} alt='' />
      <div className='lectureCard__container'>
        <h3>{title}</h3>
        <div>{instructor}</div>
        <span>{price}</span>
      </div>
    </div>
  );
}

export default LectureCard;
