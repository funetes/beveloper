import React, { useState, useEffect } from 'react';
import './EditInput.css';

import db from '../../firebase/db';

import { Input, Button } from '@material-ui/core';
const EditInput = ({ lectureId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState(0);
  const [disable, setDisbale] = useState(true);
  useEffect(() => {
    db.collection('lectures')
      .doc(lectureId)
      .get()
      .then(res => {
        const { title, description, instructor, price } = res.data();
        setTitle(title);
        setDescription(description);
        setInstructor(instructor);
        setPrice(price);
      });
  }, [lectureId]);
  const onClick = () => {
    setDisbale(true);
    db.collection('lectures')
      .doc(lectureId)
      .update({
        title,
        description,
        instructor,
        price,
      })
      .then(_ => console.log('updated'))
      .catch(error => {
        console.error(error);
        setDisbale(false);
      });
  };
  const onEditBtnClick = () => setDisbale(prev => !prev);

  return (
    <div className='editInput'>
      {/*  */}
      <Input
        type='text'
        value={title}
        placeholder='title'
        disabled={disable}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        type='text'
        value={description}
        placeholder='description'
        disabled={disable}
        onChange={e => setDescription(e.target.value)}
      />
      <Input
        type='text'
        value={instructor}
        placeholder='instructor'
        disabled={disable}
        onChange={e => setInstructor(e.target.value)}
      />
      <Input
        type='number'
        value={price}
        placeholder='price'
        disabled={disable}
        onChange={e => setPrice(e.target.value)}
      />
      <div className='editInput__btnContainer'>
        <Button
          className='editInput__btn'
          color='secondary'
          onClick={onEditBtnClick}>
          Edit
        </Button>
        <Button
          className='editInput__btn'
          variant='contained'
          color='primary'
          disabled={disable}
          onClick={onClick}>
          변경
        </Button>
      </div>
    </div>
  );
};

export default EditInput;
