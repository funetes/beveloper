import React, { useState, useEffect } from 'react';
import './FavoriteLectures.css';
import { Link } from 'react-router-dom';
import db from '../../firebase/db';

const FavoriteLectures = ({ favorites }) => {
  const [favoriteLectures, setFavoriteLectures] = useState([]);
  useEffect(() => {
    if (favorites) {
      const favoriteLectuesFromFB = () => {
        favorites.map(async favorite => {
          const result = await db.collection('lectures').doc(favorite).get();
          setFavoriteLectures(prevArr => [
            ...prevArr,
            { id: favorite, ...result.data() },
          ]);
        });
      };
      favoriteLectuesFromFB();
    }
  }, [favorites]);
  return (
    <div className='FavoriteLectures'>
      <h1>즐겨찾기</h1>
      {favoriteLectures.map(
        ({ id, title, thumbnail, instructor, description }) => (
          <div key={id}>
            <Link
              to={{
                pathname: `/lecture/${id}`,
                state: {
                  thumbnail,
                  title,
                  instructor,
                  description,
                },
              }}>
              <span>∙</span> {title}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default FavoriteLectures;
