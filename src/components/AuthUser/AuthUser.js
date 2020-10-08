import React, { useState } from 'react';
import db from '../../firebase/db';
import './AuthUser.css';
const AuthUser = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);
  const onChange = async (e, id) => {
    const {
      target: { checked },
    } = e;
    console.log(checked, id);
    await db.collection('users').doc(id).update({
      admin: checked,
    });
    setUserInfo(prevUser => ({
      ...prevUser,
      admin: checked,
    }));
  };
  return (
    <div className='authUser'>
      <input
        type='checkbox'
        checked={userInfo.admin}
        onChange={e => {
          onChange(e, userInfo.id);
        }}
      />
      <div className='authUser__id'>{userInfo.id}</div>
      <div className='authUser__email'>{userInfo.email}</div>
    </div>
  );
};

export default AuthUser;
