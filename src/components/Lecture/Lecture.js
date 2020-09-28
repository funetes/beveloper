import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams, withRouter } from 'react-router-dom';

import db from '../../firebase/db';
import firebase from 'firebase';

import SidebarContent from '../SidebarContent/SidebarContent';
import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaDonate } from 'react-icons/fa';

const Lecture = ({
  user,
  location: {
    state: { thumbnail, title, description },
  },
}) => {
  const { id } = useParams();
  const [lecture, setLecture] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [isFaborite, setIsFaborite] = useState(false);
  const onClick = id => setVideoId(id);

  useEffect(() => {
    const userFaboriteInfo = async () => {
      if (user) {
        const result = await db.collection('users').doc(user?.uid).get();
        const { faborites } = result.data();
        setIsFaborite(faborites.some(faborite => faborite === id));
      }
    };
    userFaboriteInfo();
  }, [user, id]);

  useEffect(() => {
    const unsubscribe = db
      .collection('lectures')
      .doc(id)
      .collection('videos')
      .orderBy('serverTimestamp', 'asc')
      .onSnapshot(snapshot => {
        snapshot.docs.length !== 0 &&
          setLecture(
            snapshot.docs.map(doc => ({
              id: doc.id,
              caption: doc.data().caption,
            }))
          );
      });
    return () => unsubscribe();
  }, [id]);
  const onFaboriteBtnClick = async () => {
    try {
      const faboriteRef = db.collection('users').doc(user?.uid);
      if (isFaborite) {
        await faboriteRef.update({
          faborites: firebase.firestore.FieldValue.arrayRemove(id),
        });
        setIsFaborite(false);
      } else {
        await faboriteRef.update({
          faborites: firebase.firestore.FieldValue.arrayUnion(id),
        });
        setIsFaborite(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onDonateBtnClick = () => {
    console.log('onDonateBtnClick ==> moveto donate link');
  };
  return (
    <div className='lecture'>
      <div className='lecture__sidebar'>
        {lecture.length === 0 ? (
          <div>
            chapter가 없습니다.
            <span role='img' aria-labelledby='emoji'>
              😭
            </span>
          </div>
        ) : (
          lecture.map(({ caption, id }) => (
            <SidebarContent
              key={id}
              id={id}
              caption={caption}
              onclick={onClick}
            />
          ))
        )}
      </div>
      <div className='lecture__videoAndComment'>
        {videoId ? (
          <Video videoId={videoId} lectureId={id} />
        ) : (
          <div className='lecture__intro'>
            <img src={thumbnail} alt='thumbnail' />
            <div className='lecture__buttonContainer'>
              <button onClick={onFaboriteBtnClick}>
                {isFaborite ? <FaStar /> : <FaRegStar />}
              </button>
              <button onClick={onDonateBtnClick}>
                <FaDonate />
              </button>
            </div>
            <div className='lecture__info'>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
          </div>
        )}
        {videoId && (
          <>
            <CommentAdder videoId={videoId} lectureId={id} user={user} />
            <Comment videoId={videoId} lectureId={id} user={user} />
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Lecture);
