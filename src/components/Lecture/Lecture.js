import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams } from 'react-router-dom';
import db from '../../firebase/db';
import SidebarContent from '../SidebarContent/SidebarContent';
import Video from '../Video/Video';
import Comment from '../Comment/Comment';
function Lecture() {
  const { id } = useParams();
  const [lecture, setLecture] = useState([]);
  const [videoId, setVideoId] = useState('');

  const onClick = id => setVideoId(id);

  useEffect(() => {
    db.collection('lectures')
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
        <Video videoId={videoId} lectureId={id} />
        {videoId ? <Comment /> : null}
      </div>
      {/* comment */}
    </div>
  );
}

export default Lecture;
