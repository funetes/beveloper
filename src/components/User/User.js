import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './User.js';

import UserInfo from '../UserInfo/UserInfo';

const User = ({ user, history }) => {
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);
  return (
    <div>
      <UserInfo user={user} />
      {/* userInfo */}
      {/* Favoriteslecture */}
    </div>
  );
};

export default withRouter(User);
