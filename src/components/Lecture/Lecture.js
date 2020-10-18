import React, { useState, useEffect } from 'react';
import './Lecture.css';
import db from '../../firebase/db';
import firebase from 'firebase/app';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';
import Sidebar from '../Sidebar/Sidebar';
import LectureIntro from '../LectureIntro/LectureIntro';
import Reply from '../Reply/Reply';
import { BsListCheck } from 'react-icons/bs';

const Lecture = () => {
  const [chapterId, setChapterId] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [sidebarIcon, setSidebarIcon] = useState(false);
  const {
    state: { thumbnail, title, description },
  } = useLocation();
  const { id: lectureId } = useParams();
  const user = useSelector(({ user }) => user);

  const onClick = chapterId => setChapterId(chapterId);

  useEffect(() => {
    let unsubscribe;
    if (chapterId) {
      unsubscribe = db
        .collection('lectures')
        .doc(lectureId)
        .collection('videos')
        .doc(chapterId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>
          setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        );
    }
    return () => {
      return unsubscribe ? unsubscribe() : null;
    };
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
  const onLectureIconClick = () => {
    setSidebarIcon(prev => !prev);
  };
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
    <>
      <Helmet>
        <title>{`Beveloper | ${title}`}</title>
      </Helmet>
      <main className='lecture'>
        <div
          className='lecture__icon'
          style={{ display: sidebarIcon ? 'none' : 'block' }}>
          <BsListCheck onClick={onLectureIconClick} />
        </div>
        <Sidebar
          onClick={onClick}
          lectureId={lectureId}
          isSidebarIcon={sidebarIcon}
          onLectureIconClick={onLectureIconClick}
        />
        <div className='lecture__videoAndComment'>
          {chapterId ? (
            <Video chapterId={chapterId} lectureId={lectureId} />
          ) : (
            <LectureIntro
              thumbnail={thumbnail}
              title={title}
              description={description}
              lectureId={lectureId}
            />
          )}
          {chapterId && (
            <section style={{ width: '100%' }}>
              <CommentAdder onSubmit={onSubmit} text={text} setText={setText} />
              <Comment
                comments={comments}
                onDeleteClick={onDeleteClick}
                Reply={Reply}
                lectureId={lectureId}
                chapterId={chapterId}
              />
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Lecture;
