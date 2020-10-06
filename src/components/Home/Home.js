import React from 'react';
import './Home.css';
import LectureCard from '../LectureCard/LectureCard';
import Logo from '../Logo/Logo';
import { useSelector } from 'react-redux';
const Home = () => {
  const { lectures, loading } = useSelector(
    ({ lectures: { lectures, loading } }) => ({
      lectures,
      loading,
    })
  );
  return (
    <>
      {loading ? (
        <div className='loading'>
          <Logo />
        </div>
      ) : (
        <main className='home'>
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
        </main>
      )}
    </>
  );
};

export default Home;
