import React, { useState } from 'react';
import './CommentAdder.css';
import { useSelector } from 'react-redux';

import db from '../../firebase/db';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

const CommentAdder = ({ chapterId, lectureId }) => {
  const user = useSelector(({ user }) => user);
  const [text, setText] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    if (text === '') {
      return;
    }

    try {
      await db
        .collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(chapterId)
        .collection('comments')
        .add({
          username: user.displayName,
          text: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          creator: user.uid,
        });
      setText('');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className='commentAdder'>
      <form className='commentAdder__form' onSubmit={onSubmit}>
        <textarea
          className='commentAdder__textarea'
          value={text}
          cols='90'
          rows='5'
          required
          disabled={user ? false : true}
          placeholder={
            user ? '댓글달기' : '로그인하시면 댓글을 달 수 있습니다.'
          }
          onChange={e => setText(e.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={user ? false : true}>
          add
        </Button>
      </form>
    </div>
  );
};

export default CommentAdder;
