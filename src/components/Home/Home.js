import React from 'react';
import './Home.css';
import thumbnail from '../../assets/img/thumbnail.001.png';
import thumbnail1 from '../../assets/img/thumbnail.002.png';
import thumbnail2 from '../../assets/img/thumbnail.003.png';
import LectureCard from '../LectureCard/LectureCard';
const datas = [
  {
    id: 1,
    img: thumbnail,
    title: 'javascript 뿌시기',
    instructor: 'kim hwan',
    price: 10000,
  },
  {
    id: 2,
    img: thumbnail1,
    title: 'css 뿌시기',
    instructor: 'kim hwan',
    price: 13000,
  },
  {
    id: 3,
    img: thumbnail2,
    title: 'html 뿌시기',
    instructor: 'kim hwan',
    price: 14000,
  },
  {
    id: 4,
    img: thumbnail,
    title: 'react 뿌시기',
    instructor: 'kim hwan',
    price: 15000,
  },
];

function Home() {
  return (
    <div className='home'>
      {datas.map(data => (
        <LectureCard
          key={data.id}
          img={data.img}
          title={data.title}
          instructor={data.instructor}
          price={data.price}
        />
      ))}
    </div>
  );
}

export default Home;
