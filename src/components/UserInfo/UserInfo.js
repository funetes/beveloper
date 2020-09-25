import React, { useState } from 'react';
import './UserInfo.css';

import auth from '../../firebase/auth';
import { Button, Input } from '@material-ui/core';

const UserInfo = ({ user }) => {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    const user = auth.currentUser;
    if (user.providerData) {
      // facebook, google
    } else {
      // email
    }
  };

  return (
    <div className='userInfo'>
      <p>
        username: <span>{user?.displayName}</span>
        <Button
          onClick={e => {
            setOpen(prev => !prev);
          }}>
          변경
        </Button>
      </p>
      {open && <Input placeholder='username' />}
      <p>
        email: <span>{user?.email}</span>
      </p>
    </div>
  );
};

export default UserInfo;
