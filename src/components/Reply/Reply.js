import React, { useState, useEffect } from 'react';
import './Reply.css';
import firebase from 'firebase';
import db from '../../firebase/db';

import Button from '@material-ui/core/Button';

const Reply = ({ user, id, videoId, lectureId }) => {
  const [open, setOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const [replyComments, setReplyComments] = useState([]);
  const onClick = () => {
    setOpen(prev => !prev);
  };
  useEffect(() => {
    db.collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .collection('comments')
      .doc(id)
      .collection('replys')
      .onSnapshot(snapshot =>
        setReplyComments(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      );
  }, [lectureId, videoId, id]);
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      // add to comment in firebase
      db.collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(videoId)
        .collection('comments')
        .doc(id)
        .collection('replys')
        .add({
          username: user?.displayName,
          text: replyComment,
          creator: user?.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(_ => {
          setReplyComment('');
          setOpen(false);
        })
        .catch(error => console.log(error));
    }
  };
  const onReplyCommentsClick = () => {
    setCommentsOpen(prev => !prev);
  };
  return (
    <>
      <div className='reply'>
        <button className='reply__button' onClick={onClick}>
          답글
        </button>
      </div>
      {open && (
        <>
          <textarea
            className='reply__input'
            type='text'
            placeholder='reply...'
            value={replyComment}
            cols='80'
            rows='3'
            required
            onChange={e => setReplyComment(e.target.value)}
            // onKeyPress={onKeyPress}
          />
          <div className='reply__inputBtnContainer'>
            <Button color='secondary' variant='contained'>
              취소
            </Button>
            <Button color='primary' variant='contained'>
              답글
            </Button>
          </div>
        </>
      )}
      {replyComments.length !== 0 && (
        <div className='reply__commentsCount' onClick={onReplyCommentsClick}>
          {replyComments.length}개의 답글
        </div>
      )}
      {
        // show replys...
        commentsOpen && (
          <div className='reply__container'>
            {replyComments.map(replyComment => (
              <div key={replyComment.id} className='reply__comment'>
                <div className='reply__commentUsername'>
                  {replyComment.username}
                </div>
                <pre>{replyComment.text}</pre>
                <div className='reply__date'>2020.09.17</div>
              </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Reply;
