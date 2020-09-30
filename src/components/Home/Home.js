import React from 'react';
import './Home.css';
import LectureCard from '../LectureCard/LectureCard';
import Logo from '../Logo/Logo';
function Home({ lectures, loading }) {
  return (
    <>
      {loading ? (
        <div className='loading'>
          <Logo />
        </div>
      ) : (
        <div className='home'>
          {lectures.map(
            ({
              id,
              lecture: { thumbnail, title, instructor, price, description },
            }) => (
              <LectureCard
                key={id}
                id={id}
                thumbnail={thumbnail}
                title={title}
                instructor={instructor}
                price={price}
                description={description}
              />
            )
          )}
        </div>
      )}
    </>
  );
}

export default Home;
