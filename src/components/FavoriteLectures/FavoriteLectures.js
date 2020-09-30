import React, { useState, useEffect } from 'react';
import './FavoriteLectures.css';
import { Link } from 'react-router-dom';
import db from '../../firebase/db';
import Loading from '../Loading/Loading';

const FavoriteLectures = ({ favorites }) => {
  const [favoriteLectures, setFavoriteLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const favoriteLectuesFromFB = async () => {
      if (favorites.length !== 0) {
        try {
          const favoritesPArr = favorites.map(async favorite => {
            const result = await db.collection('lectures').doc(favorite).get();
            return result.data();
          });
          const favoritesArr = await Promise.all(favoritesPArr);
          setFavoriteLectures(
            favoritesArr.map((favorite, i) => ({
              id: favorites[i],
              ...favorite,
            }))
          );
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    favoriteLectuesFromFB();
  }, [favorites]);
  return (
    <div className='FavoriteLectures'>
      <h1>즐겨찾기</h1>
      {loading ? (
        <Loading />
      ) : (
        favoriteLectures.map(
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
        )
      )}
    </div>
  );
};

export default FavoriteLectures;
