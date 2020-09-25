import React, { useState, useEffect } from 'react';
import './Reply.css';
import firebase from 'firebase';
import db from '../../firebase/db';

import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Reply = ({ user, id, videoId, lectureId }) => {
  const [open, setOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    db.collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .collection('comments')
      .doc(id)
      .collection('replys')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setReplyComments(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      );
  }, [lectureId, videoId, id]);
  const onAddReplyClick = () => setOpen(prev => !prev);
  const onReplyCountsClick = () => setCommentsOpen(prev => !prev);
  const onReplySendClick = () => {
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
  };
  const onReplysendCancelClick = () => {
    setReplyComment('');
    setOpen(false);
  };
  const toDate = ({ timestamp }) => {
    const date = new Date(0);
    date.setSeconds(timestamp?.seconds);
    return date.toLocaleString().substr(0, 11).trim();
  };
  return (
    <>
      {user && (
        <div className='reply'>
          <button className='reply__button' onClick={onAddReplyClick}>
            답글
          </button>
        </div>
      )}
      {open && (
        <>
          <textarea
            className='reply__input'
            type='text'
            placeholder='댓글을 입력하세요.'
            value={replyComment}
            cols='80'
            rows='3'
            required
            onChange={e => setReplyComment(e.target.value)}
          />
          <div className='reply__inputBtnContainer'>
            <Button color='secondary' onClick={onReplysendCancelClick}>
              취소
            </Button>
            <Button color='primary' onClick={onReplySendClick}>
              답글
            </Button>
          </div>
        </>
      )}
      {replyComments.length !== 0 && (
        <div className='reply__commentsCount' onClick={onReplyCountsClick}>
          {commentsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
                <div className='reply__date'>{toDate(replyComment)}</div>
              </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Reply;
