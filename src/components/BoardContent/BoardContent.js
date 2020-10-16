import React, { useEffect, useState } from 'react';
import './BoardContent.css';
import db from '../../firebase/db';
import firebase from 'firebase';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import toDate from '../../utils/toDate';
import CommentAdder from '../CommentAdder/CommentAdder';
import Comment from '../Comment/Comment';
import { formStyle, containerStyle } from './style';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import {
  saveTolocalStorage,
  deleteToLocalStorage,
  isInLocalStorage,
} from '../../utils/toggleLikes';
const BoardContent = () => {
  const { state: board } = useLocation();
  const [comments, setComments] = useState([]);
  const [likeToggle, setLikeToggle] = useState(isInLocalStorage(board.id));
  const [text, setText] = useState('');
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    const unsubscribe = db
      .collection('boards')
      .doc(board.id)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      );
    return () => unsubscribe();
  }, [board.id]);
  const onLikeBtnClick = async () => {
    const boardRef = db.collection('boards').doc(board.id);
    try {
      if (likeToggle) {
        deleteToLocalStorage(board.id);
        await boardRef.update({
          likes: --board.likes,
        });
        setLikeToggle(prev => !prev);
      } else {
        saveTolocalStorage(board.id);
        await boardRef.update({
          likes: ++board.likes,
        });
        setLikeToggle(prev => !prev);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const onDeleteClick = async id => {
    try {
      await db
        .collection('boards')
        .doc(board.id)
        .collection('comments')
        .doc(id)
        .delete();
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (text === '') return;
    try {
      await db.collection('boards').doc(board.id).collection('comments').add({
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
    <main className='boardContent'>
      <h1 className='boardContent__title'>{board.title}</h1>
      <span className='boardContent__time'>
        {toDate(board.timestamp?.seconds, { all: true })}
      </span>
      {/* content */}
      <div className='boardContent__content'>
        <ReactMarkdown source={board.description} escapeHtml={false} />
      </div>
      <div className='boardContent__likes'>
        {/* like icon */}
        <button className='boardContent__likesBtn' onClick={onLikeBtnClick}>
          {likeToggle ? <FcLike /> : <FcLikePlaceholder />}
        </button>
        <span>{board.likes}</span>
      </div>
      <div className='boardContent__divider' />
      {/* 댓글쓰기 */}
      <CommentAdder
        onSubmit={onSubmit}
        text={text}
        setText={setText}
        formStyle={formStyle}
      />
      {/* 댓글 */}
      <Comment
        comments={comments}
        onDeleteClick={onDeleteClick}
        containerStyle={containerStyle}
      />
    </main>
  );
};
export default BoardContent;
