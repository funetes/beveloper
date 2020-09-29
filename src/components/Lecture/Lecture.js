import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams, withRouter } from 'react-router-dom';

import db from '../../firebase/db';
import { firestore } from 'firebase';

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
  const [isFavorite, setIsFavorite] = useState(false);
  const onClick = id => setVideoId(id);

  useEffect(() => {
    const userFavoriteInfo = async () => {
      if (user) {
        const result = await db.collection('users').doc(user?.uid).get();
        const { favorites } = result.data();
        setIsFavorite(favorites.some(favorite => favorite === id));
      }
    };
    userFavoriteInfo();
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
  const onFavoriteBtnClick = async () => {
    try {
      const favoriteRef = db.collection('users').doc(user?.uid);
      if (isFavorite) {
        await favoriteRef.update({
          favorites: firestore.FieldValue.arrayRemove(id),
        });
        setIsFavorite(false);
      } else {
        await favoriteRef.update({
          favorites: firestore.FieldValue.arrayUnion(id),
        });
        setIsFavorite(true);
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
              <button onClick={onFavoriteBtnClick}>
                {isFavorite ? <FaStar /> : <FaRegStar />}
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
