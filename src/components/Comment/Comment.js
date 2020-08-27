import React, { useState, useEffect } from 'react';
import './Comment.css';
import db from '../../firebase/db';
function Comment({ videoId, lectureId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
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
  return (
    <div className='comment'>
      {comments.map(({ id, comment }) => (
        <div className='comment__container' key={id}>
          <span className='comment__username'>{comment.username}</span>
          <p className='comment_text'>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
