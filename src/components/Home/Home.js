import React, { useState, useEffect } from 'react';
import './Home.css';
import db from '../../firebase/db';
import LectureCard from '../LectureCard/LectureCard';

function Home({ lectures }) {
  return (
    <>
      <h1>web을 공부한것들을 영상으로 제작하여 정리하였습니다.</h1>
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
    </>
  );
}

export default Home;
