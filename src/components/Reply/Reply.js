import React, { useState, useEffect, memo } from 'react';
import './Reply.css';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import db from '../../firebase/db';

import toDate from '../../utils/toDate';

import Button from '@material-ui/core/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { CSSTransition } from 'react-transition-group';

const Reply = ({ commentId, chapterId, lectureId }) => {
  const user = useSelector(({ user }) => user);
  const [open, setOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    db.collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(chapterId)
      .collection('comments')
      .doc(commentId)
      .collection('replys')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setReplyComments(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      );
  }, [lectureId, chapterId, commentId]);
  const onAddReplyClick = () => setOpen(prev => !prev);
  const onReplyCountsClick = () => setCommentsOpen(prev => !prev);
  const onReplySendClick = async () => {
    try {
      await db
        .collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(chapterId)
        .collection('comments')
        .doc(commentId)
        .collection('replys')
        .add({
          username: user?.displayName,
          text: replyComment,
          creator: user?.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setReplyComment('');
      setOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const onReplySendCancelClick = () => {
    setReplyComment('');
    setOpen(false);
  };
  return (
    <>
      {user?.uid && (
        <div className='reply'>
          <button className='reply__button' onClick={onAddReplyClick}>
            답글
          </button>
        </div>
      )}
      <CSSTransition
        in={open}
        timeout={{ enter: 300, exit: 300 }}
        classNames='reply__transition'
        unmountOnExit>
        <div className='reply__commentContainer'>
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
            <Button color='secondary' onClick={onReplySendCancelClick}>
              취소
            </Button>
            <Button color='primary' onClick={onReplySendClick}>
              답글
            </Button>
          </div>
        </div>
      </CSSTransition>

      {replyComments.length !== 0 && (
        <div className='reply__commentsCount' onClick={onReplyCountsClick}>
          {commentsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {replyComments.length}개의 답글
        </div>
      )}
      <CSSTransition
        in={commentsOpen}
        timeout={{ enter: 300, exit: 300 }}
        classNames='reply__CommentTransition'
        unmountOnExit>
        <div className='reply__container'>
          {replyComments.map(({ id, username, text, timestamp }) => (
            <div key={id} className='reply__comment'>
              <div className='reply__commentUsername'>{username}</div>
              <pre>{text}</pre>
              <div className='reply__date'>{toDate(timestamp?.seconds)}</div>
            </div>
          ))}
        </div>
      </CSSTransition>
    </>
  );
};

export default memo(Reply);
