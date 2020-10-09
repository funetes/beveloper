import React, { useState, useEffect, memo } from 'react';
import './FavoriteLectures.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import db from '../../firebase/db';
import Loading from '../Loading/Loading';

const FavoriteLectures = () => {
  const user = useSelector(({ user }) => user);
  const uid = user?.uid;
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favoriteFromFB = async () => {
      if (uid) {
        try {
          setLoading(true);
          const result = await db.collection('users').doc(uid).get();
          const { favorites = [] } = result.data();
          const favoritesPromiseArr = favorites.map(async favorite => {
            const result = await db.collection('lectures').doc(favorite).get();
            return result.data();
          });
          const favoritesArr = await Promise.all(favoritesPromiseArr);
          setFavorites(
            favoritesArr.map((favorite, i) => ({
              id: favorites[i],
              ...favorite,
            }))
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    favoriteFromFB();
  }, [uid]);

  return (
    <section className='FavoriteLectures'>
      <h1>즐겨찾기</h1>
      {loading ? (
        <Loading />
      ) : favorites?.length === 0 ? (
        <div>
          즐겨찾기가 없습니다.
          <span role='img' aria-labelledby='emoji'>
            😭
          </span>
        </div>
      ) : (
        <ul>
          {favorites?.map(
            ({ id, title, thumbnail, instructor, description }) => (
              <li key={id}>
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
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};

export default memo(FavoriteLectures);
