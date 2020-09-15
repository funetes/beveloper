import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams } from 'react-router-dom';
import db from '../../firebase/db';
import SidebarContent from '../SidebarContent/SidebarContent';
import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';
import Logo from '../Logo/Logo';
function Lecture({ user }) {
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
        {lecture.map(({ caption, id }) => (
          <SidebarContent
            key={id}
            id={id}
            caption={caption}
            onclick={onClick}
          />
        ))}
      </div>
      <div className='lecture__videoAndComment'>
        {videoId ? <Video videoId={videoId} lectureId={id} /> : <Logo />}
        {videoId && (
          <CommentAdder videoId={videoId} lectureId={id} user={user} />
        )}
        {videoId && <Comment videoId={videoId} lectureId={id} />}
      </div>
    </div>
  );
}

export default Lecture;
