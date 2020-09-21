import React, { useState, useEffect } from 'react';
import './Comment.css';
import db from '../../firebase/db';
import Button from '@material-ui/core/Button';
const Comment = ({ videoId, lectureId, user }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log('comments');
    const unsubscribe = db
      .collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setComments(
          snapshot.docs.map(doc => ({ id: doc.id, comment: doc.data() }))
        )
      );
    return () => unsubscribe();
  }, [videoId, lectureId]);

  const onDeleteClick = async id => {
    await db
      .collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .collection('comments')
      .doc(id)
      .delete();
  };
  const toDate = ({ timestamp }) => {
    const date = new Date(0);
    date.setSeconds(timestamp?.seconds);
    return date.toLocaleString().substr(0, 11).trim();
  };

  return (
    <div className='comment'>
      {comments.map(({ id, comment }) => (
        <div className='comment__container' key={id}>
          <span className='comment__username'>{comment.username}</span>
          <p className='comment__text'>{comment.text}</p>
          <p className='comment__time'>{toDate(comment)}</p>
          {user?.uid === comment.creator && (
            <Button
              className='comment_button'
              onClick={() => onDeleteClick(id)}
              color='secondary'>
              del
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
