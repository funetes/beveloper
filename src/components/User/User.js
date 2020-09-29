import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './User.css';

import db from '../../firebase/db';

import UserInfo from '../UserInfo/UserInfo';
import FavoriteLectures from '../FavoriteLectures/FavoriteLectures';

const User = ({ user, history }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

  useEffect(() => {
    if (user) {
      const favoriteFromFB = async () => {
        const result = await db.collection('users').doc(user?.uid).get();
        const { favorites } = result.data();
        setFavorites(favorites);
      };
      favoriteFromFB();
    }
  }, [user]);

  return (
    <div className='User'>
      <UserInfo user={user} />
      <FavoriteLectures favorites={favorites} />
    </div>
  );
};

export default withRouter(User);
