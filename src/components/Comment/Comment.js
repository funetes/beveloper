import React, { useState, useEffect } from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';

import db from '../../firebase/db';

import toDate from '../../utils/toDate';
import Button from '@material-ui/core/Button';
import Reply from '../Reply/Reply';

const Comment = ({ chapterId, lectureId }) => {
  const [comments, setComments] = useState([]);
  const user = useSelector(({ user }) => user);
  useEffect(() => {
    const unsubscribe = db
      .collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(chapterId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );
    return () => unsubscribe();
  }, [chapterId, lectureId]);

  const onDeleteClick = async id => {
    try {
      await db
        .collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(chapterId)
        .collection('comments')
        .doc(id)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='comment'>
      {comments.map(({ id, username, text, timestamp, creator }) => (
        <div className='comment__container' key={id}>
          <span className='comment__username'>{username}</span>
          <pre className='comment__text'>{text}</pre>
          <p className='comment__time'>{toDate(timestamp?.seconds)}</p>
          {user?.uid === creator && (
            <Button
              className='comment_button'
              onClick={() => onDeleteClick(id)}
              color='secondary'>
              del
            </Button>
          )}
          <Reply commentId={id} chapterId={chapterId} lectureId={lectureId} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
