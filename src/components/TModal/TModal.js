import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import './TModal.css';
const useStyles = makeStyles(theme =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid lightgray',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: '10px',
      width: '25%',
    },
  })
);

const TransitionsModal = ({ open, setOpen, isSignUp, signIn, signUp }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== password2) {
        setError('비밀번호를 확인해주세요.');
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        signUp(email, password, username);
      }
    } else {
      signIn(email, password);
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
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <form onSubmit={onSubmit} className='modal__form'>
            <h2 className='modal__formLogin' id='login'>
              Beveloper
            </h2>
            {isSignUp && (
              <Input
                type='text'
                value={username}
                placeholder='username'
                onChange={e => setUsername(e.target.value)}
              />
            )}
            <Input
              type='email'
              value={email}
              placeholder='email'
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type='password'
              value={password}
              placeholder='password'
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
        </div>
      </Modal>
    </>
  );
};

export default TransitionsModal;
