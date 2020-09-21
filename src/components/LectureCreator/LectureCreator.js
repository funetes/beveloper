import React, { useState } from 'react';
import './LectureCreator.css';
import db from '../../firebase/db';
import storage from '../../firebase/storage';
import { Input, Button } from '@material-ui/core';
function LectureCreator() {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState('');

  const handleChange = e =>
    e.target.files[0] && setThumbnail(e.target.files[0]);

  const createLecture = () => {
    //thumbnail upload to storage
    const uploadTask = storage
      .ref(`thumbnails/${thumbnail.name}`)
      .put(thumbnail);
    uploadTask.on(
      'state_changed',
      null,
      error => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(thumbnail => {
          // store to database
          db.collection('lectures')
            .add({
              description,
              instructor,
              price,
              thumbnail,
              title,
            })
            .then(_ => console.log('created'));
        });
      }
    );
  };

  return (
    <div className='lectureCreator'>
      <div className='lectureCreator__uplodeContainer'>
        <Input
          onChange={e => setTitle(e.target.value)}
          placeholder='title'
          value={title}
        />
        <Input
          onChange={e => setDescription(e.target.value)}
          placeholder='description'
          value={description}
        />
        <Input
          onChange={e => setInstructor(e.target.value)}
          placeholder='instructor'
          value={instructor}
        />
        <Input
          type='number'
          onChange={e => setPrice(e.target.value)}
          placeholder='price'
          value={price}
        />
        <p>upload Thumbnail only .png</p>
        <Input type='file' onChange={handleChange} />
      </div>
      <Button variant='contained' color='primary' onClick={createLecture}>
        강의 만들기
      </Button>
    </div>
  );
}

export default LectureCreator;
