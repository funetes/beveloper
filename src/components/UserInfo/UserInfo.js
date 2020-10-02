import React, { useState } from 'react';
import './UserInfo.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import auth from '../../firebase/auth';
import storage from '../../firebase/storage';
import PersonIcon from '@material-ui/icons/Person';

const UserInfo = ({ user, setUser }) => {
  const [avatar, setAvatar] = useState('');
  const [disable, setDisbale] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarInputOpen, setAvatarInputOpen] = useState(false);
  const [usernameInputOpen, setUsernameInputOpen] = useState(false);
  const handleChange = e => e.target.files[0] && setAvatar(e.target.files[0]);
  const uploadAvatar = async () => {
    if (!avatar) {
      return;
    }
    setDisbale(true);
    const uploadTask = storage.ref(`avatar/${avatar.name}`).put(avatar);
    uploadTask.on(
      'state_changed',
      null,
      error => {
        console.error(error);
      },
      async () => {
        try {
          const avatarUrl = await uploadTask.snapshot.ref.getDownloadURL();
          const user = auth.currentUser;
          await user.updateProfile({
            photoURL: avatarUrl,
          });
          setUser(prevUser => ({ ...prevUser, photoURL: avatarUrl }));
        } catch (error) {
          alert(error.message);
        } finally {
          setAvatar(null);
          setDisbale(false);
          setAvatarInputOpen(false);
        }
      }
    );
  };
  const uploadUsername = async () => {
    if (username === '') {
      return;
    }
    try {
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: username,
      });
      setUser(prevUser => ({ ...prevUser, displayName: username }));
    } catch (error) {
      console.error(error.message);
    } finally {
      setUsername('');
      setUsernameInputOpen(false);
    }
  };

  return (
    <div className='userInfo'>
      <div className='userInfo__imgContainer'>
        {user?.photoURL ? (
          <div
            className='userInfo__imgbg'
            style={{
              backgroundImage: `url(${user?.photoURL})`,
              backgroundPosition: '50% 50%',
              backgroundSize: 'cover',
            }}>
            <img
              src={`${user?.photoURL}`}
              style={{ visibility: 'hidden' }}
              alt='avatar'
            />
          </div>
        ) : (
          <PersonIcon
            style={{
              fontSize: '10rem',
              border: '1px solid',
              borderRadius: '50',
            }}
          />
        )}
        <Button
          color='primary'
          onClick={() => {
            setAvatarInputOpen(prev => !prev);
          }}>
          edit
        </Button>
        {avatarInputOpen && (
          <div className='userInfo__avatarInputContainer'>
            <Input
              type='file'
              onChange={handleChange}
              disabled={disable ? true : false}
            />
            <button onClick={uploadAvatar}>변경</button>
          </div>
        )}
      </div>
      <div className='userInfo__infoContainer'>
        username: <span>{user?.displayName}</span>{' '}
        <Button
          color='primary'
          onClick={e => {
            setUsernameInputOpen(prev => !prev);
          }}>
          edit
        </Button>
        {usernameInputOpen && (
          <div className='userInfo__usernameInputContainer'>
            <Input
              type='text'
              onChange={e => {
                setUsername(e.target.value);
              }}
              value={username}
              disabled={disable ? true : false}
            />
            <button onClick={uploadUsername}>변경</button>
          </div>
        )}
        <div>
          email: <span>{user?.email}</span>{' '}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
