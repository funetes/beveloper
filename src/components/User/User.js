import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './User.css';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import db from '../../firebase/db';

import UserInfo from '../UserInfo/UserInfo';
import FavoriteLectures from '../FavoriteLectures/FavoriteLectures';

const User = ({ history }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

  useEffect(() => {
    if (user) {
      const favoriteFromFB = async () => {
        setLoading(true);
        try {
          const result = await db.collection('users').doc(user?.uid).get();
          const { favorites = [] } = result.data();
          const favoritesPArr = favorites.map(async favorite => {
            const result = await db.collection('lectures').doc(favorite).get();
            return result.data();
          });
          const favoritesArr = await Promise.all(favoritesPArr);
          setFavorites(
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
      };
      favoriteFromFB();
    }
  }, [user]);

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
