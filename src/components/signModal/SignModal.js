import React, { useState } from 'react';
import './signModal.css';
import { useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import { Button, Slide, Input, Modal } from '@material-ui/core';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useStyles } from './style';
import { providerLogin, login, signup } from '../../action/userAction';
const provider = {
  GOOGLE: 'google',
  GITHUB: 'github',
};

const SignModal = ({ isSignUp }) => {
  const [open, setOpen] = useState(false);
  const { modal, paper } = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== password2) {
        setError('비밀번호를 확인해주세요.');
        setTimeout(() => {
          setError('');
        }, 2500);
      } else {
        dispatch(signup(email, password, username));
      }
    } else {
      dispatch(login(email, password));
    }
  };
  return (
    <>
      <button onClick={() => setOpen(true)} className='modal__button'>
        {isSignUp ? 'signUp' : 'login'}
      </button>
      <Modal
        aria-labelledby='login'
        aria-describedby='transition-modal-description'
        className={modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Slide in={open}>
          <div className={paper}>
            <form onSubmit={onSubmit} className='modal__form'>
              <h2 className='modal__formLogin' id='login'>
                Beveloper
              </h2>
              {isSignUp && (
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='username'
                  onChange={e => setUsername(e.target.value)}
                />
              )}
              <Input
                autoFocus={isSignUp !== true}
                type='email'
                value={email}
                placeholder='email'
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                type='password'
                value={password}
                placeholder='password'
                autoComplete='off'
                onChange={e => setPassword(e.target.value)}
              />
              {isSignUp && (
                <Input
                  type='password'
                  value={password2}
                  placeholder='password2'
                  onChange={e => setPassword2(e.target.value)}
                />
              )}
              {error.length !== 0 && error}
              <Button type='submit' id='simple-modal-description'>
                {isSignUp ? 'signUp' : 'login'}
              </Button>
            </form>
            <div className='modal__buttonContainer'>
              <Button onClick={() => dispatch(providerLogin(provider.GOOGLE))}>
                <FaGoogle />
                google
              </Button>
              <Button onClick={() => dispatch(providerLogin(provider.GITHUB))}>
                <FaGithub /> github
              </Button>
            </div>
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default SignModal;
