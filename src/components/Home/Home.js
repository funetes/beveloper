import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import LectureCard from '../LectureCard/LectureCard';
import LogoDark from '../../assets/img/LogoDark.png';
import LogoLight from '../../assets/img/LogoLight.png';
import { Fade } from '@material-ui/core';
const Home = () => {
  const { lectures, loading } = useSelector(
    ({ lecture: { lectures, loading } }) => ({
      lectures,
      loading,
    })
  );
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  return (
    <>
      {loading ? (
        <div className='loading'>{darkmode ? <LogoDark /> : <LogoLight />}</div>
      ) : (
        <main className='home'>
          <div className='home__banner'>
            <Fade in timeout={{ appear: 5, enter: 1, exit: 1 }}>
              <div className='home__bannerContainer'>
                <img
                  src={darkmode ? LogoDark : LogoLight}
                  alt='banner'
                  className='home__bannerImg'
                />
                <div className='home__bannerTextContainer'>
                  <h1>Beveloper</h1>
                  <p>
                    this is story that a man who wnat to be a web developer.
                  </p>
                  <p>웹개발을 좋아하는 한 사람의 이야기</p>
                </div>
              </div>
            </Fade>
          </div>

          <div className='home__lecture'>
            {lectures.map(
              ({ id, thumbnail, title, instructor, price, description }) => (
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
        </main>
      )}
    </>
  );
};

export default Home;
