import React, { useState } from 'react';
import './CommentAdder.css';
import db from '../../firebase/db';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
function CommentAdder({ videoId, lectureId }) {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    db.collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .collection('comments')
      .add({
        username: 'kim',
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(_ => setText(''))
      .catch(error => console.log(error.message));
  };
  return (
    <div className='commentAdder'>
      <form className='commentAdder__form' onSubmit={onSubmit}>
        <textarea
          className='commentAdder__textarea'
          value={text}
          cols='90'
          rows='5'
          onChange={e => setText(e.target.value)}></textarea>
        <Button type='submit' variant='contained' color='primary'>
          submit
        </Button>
      </form>
    </div>
  );
}

export default CommentAdder;
