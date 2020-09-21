import React from 'react';
import './Home.css';
import LectureCard from '../LectureCard/LectureCard';

function Home({ lectures }) {
  return (
    <div className='home'>
      {lectures.map(({ id, lecture }) => (
        <LectureCard
          key={id}
          id={id}
          thumbnail={lecture.thumbnail}
          title={lecture.title}
          instructor={lecture.instructor}
          price={lecture.price}
        />
      ))}
    </div>
  );
}

export default Home;
