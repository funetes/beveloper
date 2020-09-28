import React, { useState, useEffect } from 'react';
import './Comment.css';

import db from '../../firebase/db';

import toDate from '../../utils/toDate';

import Button from '@material-ui/core/Button';
import Reply from '../Reply/Reply';

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
    try {
      await db
        .collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(videoId)
        .collection('comments')
        .doc(id)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='comment'>
      {comments.map(
        ({ id, comment: { username, text, timestamp, creator } }) => (
          <div className='comment__container' key={id}>
            <span className='comment__username'>{username}</span>
            <pre className='comment__text'>{text}</pre>
            <p className='comment__time'>{toDate(timestamp.seconds)}</p>
            {user?.uid === creator && (
              <Button
                className='comment_button'
                onClick={() => onDeleteClick(id)}
                color='secondary'>
                del
              </Button>
            )}
            <Reply
              user={user}
              id={id}
              videoId={videoId}
              lectureId={lectureId}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Comment;
