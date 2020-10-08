import React from 'react';
import './AuthUser.css';
const AuthUser = ({ user: { id, email, admin } }) => {
  console.log(id, email, admin);
  return (
    <div className='authUser'>
      <div className='authUser__id'>{id}</div>
      <div className='authUser__email'>{email}</div>
      <div className='authUser__admin'>{admin ? 'true' : 'false'}</div>
    </div>
  );
};

export default AuthUser;
