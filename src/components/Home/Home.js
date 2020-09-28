import React from 'react';
import './Home.css';
import LectureCard from '../LectureCard/LectureCard';

function Home({ lectures }) {
  return (
    <div className='home'>
      {lectures.map(
        ({ id, lecture: { thumbnail, title, instructor, price } }) => (
          <LectureCard
            key={id}
            id={id}
            thumbnail={thumbnail}
            title={title}
            instructor={instructor}
            price={price}
          />
        )
      )}
    </div>
  );
}

export default Home;
