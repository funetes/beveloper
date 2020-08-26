import React, { useState, useEffect } from 'react';
import './Home.css';
import db from '../../firebase/db';
// import thumbnail from '../../assets/img/thumbnail.001.png';
// import thumbnail1 from '../../assets/img/thumbnail.002.png';
// import thumbnail2 from '../../assets/img/thumbnail.003.png';
import LectureCard from '../LectureCard/LectureCard';
// const datas = [
//   {
//     id: 1,
//     img: thumbnail,
//     title: 'javascript 뿌시기',
//     instructor: 'kim hwan',
//     price: 10000,
//   },
//   {
//     id: 2,
//     img: thumbnail1,
//     title: 'css 뿌시기',
//     instructor: 'kim hwan',
//     price: 13000,
//   },
//   {
//     id: 3,
//     img: thumbnail2,
//     title: 'html 뿌시기',
//     instructor: 'kim hwan',
//     price: 14000,
//   },
//   {
//     id: 4,
//     img: thumbnail,
//     title: 'react 뿌시기',
//     instructor: 'kim hwan',
//     price: 15000,
//   },
// ];

function Home() {
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    db.collection('lectures').onSnapshot(snapshot => {
      setLectures(
        snapshot.docs.map(doc => ({ id: doc.id, lecture: doc.data() }))
      );
    });
  }, []);
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
