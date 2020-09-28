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
    const getLectureInfo = async () => {
      try {
        const res = await db.collection('lectures').doc(lectureId).get();
        const { title, description, instructor, price } = res.data();
        setTitle(title);
        setDescription(description);
        setInstructor(instructor);
        setPrice(price);
      } catch (error) {
        console.error(error.message);
      }
    };
    getLectureInfo();
  }, [lectureId]);
  const onClick = async () => {
    try {
      setDisbale(true);
      await db
        .collection('lectures')
        .doc(lectureId)
        .update(updateInput(title, description, instructor, price));
      console.log('updated');
    } catch (error) {
      console.error(error);
      setDisbale(false);
    }
  };
  const onEditBtnClick = () => setDisbale(prev => !prev);
  const updateInput = (title, description, instructor, price) => ({
    title,
    description,
    instructor,
    price,
  });
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
