import React, { useState, useEffect } from 'react';
import './EditInput.css';

import db from '../../firebase/db';

import { Input, Button } from '@material-ui/core';
const EditInput = ({ lectureId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState(0);

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
    db.collection('lectures')
      .doc(lectureId)
      .update({
        title,
        description,
        instructor,
        price,
      })
      .then(_ => console.log('updated'));
  };
  return (
    <div className='editInput'>
      <Input
        type='text'
        value={title}
        placeholder='title'
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        type='text'
        value={description}
        placeholder='description'
        onChange={e => setDescription(e.target.value)}
      />
      <Input
        type='text'
        value={instructor}
        placeholder='instructor'
        onChange={e => setInstructor(e.target.value)}
      />
      <Input
        type='number'
        value={price}
        placeholder='price'
        onChange={e => setPrice(e.target.value)}
      />
      <Button
        className='editInput__btn'
        variant='contained'
        color='primary'
        onClick={onClick}>
        변경
      </Button>
    </div>
  );
};

export default EditInput;
