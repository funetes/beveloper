import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './User.css';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import UserInfo from '../UserInfo/UserInfo';
import FavoriteLectures from '../FavoriteLectures/FavoriteLectures';

const User = ({ history }) => {
  const user = useSelector(({ user }) => user);
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);

  return (
    <>
      <Helmet>
        <title>{`beveloper | ${user?.displayName}`}</title>
      </Helmet>
      <main className='User'>
        <UserInfo />
        <FavoriteLectures />
      </main>
    </>
  );
};

export default withRouter(User);
