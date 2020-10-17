import React, { useState } from 'react';
import './LectureCreator.css';
import db from '../../firebase/db';
import storage from '../../firebase/storage';
import firebase from 'firebase/app';
import { Input, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fatchLectures } from '../../action/lectureAction';
const LectureCreator = () => {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState('');
  const [disable, setDisbale] = useState(false);

  const handleChange = e =>
    e.target.files[0] && setThumbnail(e.target.files[0]);

  const createLecture = () => {
    //thumbnail upload to storage
    if (!thumbnail || !title || !description || !instructor || !price) {
      return;
    }
    setDisbale(true);
    const uploadTask = storage
      .ref(`thumbnails/${thumbnail.name}`)
      .put(thumbnail);
    uploadTask.on(
      'state_changed',
      null,
      error => {
        console.error(error);
      },
      async () => {
        try {
          const thumbnail = await uploadTask.snapshot.ref.getDownloadURL();
          await db.collection('lectures').add({
            description,
            instructor,
            price,
            thumbnail,
            title,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          dispatch(fatchLectures());
        } catch (error) {
          console.error(error.message);
        } finally {
          setThumbnail(null);
          setTitle('');
          setDescription('');
          setInstructor('');
          setPrice('');
          setDisbale(false);
        }
      }
    );
  };

  return (
    <section className='lectureCreator'>
      <div className='lectureCreator__uploadContainer'>
        <Input
          onChange={e => setTitle(e.target.value)}
          placeholder='title'
          required
          disabled={disable}
          value={title}
        />
        <textarea
          cols='30'
          rows='5'
          onChange={e => setDescription(e.target.value)}
          placeholder='description'
          required
          disabled={disable}
          value={description}
        />
        <Input
          onChange={e => setInstructor(e.target.value)}
          placeholder='instructor'
          required
          disabled={disable}
          value={instructor}
        />
        <Input
          type='number'
          onChange={e => setPrice(e.target.value)}
          placeholder='price'
          required
          disabled={disable}
          value={price}
        />
        <p>upload Thumbnail only .png</p>
        <Input
          type='file'
          onChange={handleChange}
          required
          disabled={disable}
        />
      </div>
      <Button
        variant='contained'
        color='primary'
        onClick={createLecture}
        disabled={disable ? true : false}>
        강의 만들기
      </Button>
    </section>
  );
};

export default LectureCreator;
