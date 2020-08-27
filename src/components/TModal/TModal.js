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

export default function TransitionsModal({ open, setOpen }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>login</Button>
      <Modal
        aria-labelledby='login'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <form onSubmit={onSubmit} className='modal__form'>
            <h2 className='modal__formLogin' id='login'>
              Login
            </h2>
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
            <Button type='submit' id='simple-modal-description'>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
