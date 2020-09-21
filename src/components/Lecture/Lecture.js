import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams, withRouter } from 'react-router-dom';

import db from '../../firebase/db';

import SidebarContent from '../SidebarContent/SidebarContent';
import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';

const Lecture = ({
  user,
  location: {
    state: { thumbnail },
  },
}) => {
  const { id } = useParams();
  const [lecture, setLecture] = useState([]);
  const [videoId, setVideoId] = useState('');

  const onClick = id => setVideoId(id);

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
          </div>
        )}
        {videoId && (
          <CommentAdder videoId={videoId} lectureId={id} user={user} />
        )}
        {videoId && <Comment videoId={videoId} lectureId={id} user={user} />}
      </div>
    </div>
  );
};

export default withRouter(Lecture);
