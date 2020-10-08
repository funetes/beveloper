import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './User.css';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import db from '../../firebase/db';
import UserInfo from '../UserInfo/UserInfo';
import FavoriteLectures from '../FavoriteLectures/FavoriteLectures';

const User = ({ history }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(({ user }) => user);
  const uid = user?.uid;
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

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
    <>
      <Helmet>
        <title>{`beveloper | ${user?.displayName}`}</title>
      </Helmet>
      <main className='User'>
        <UserInfo user={user} />
        <FavoriteLectures favorites={favorites} loading={loading} />
      </main>
    </>
  );
};

export default withRouter(User);
