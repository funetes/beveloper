import React, { useState, useEffect } from 'react';
import './Video.css';
import db from '../../firebase/db';

function Video({ videoId, lectureId }) {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    const unsubscribe = db
      .collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .onSnapshot(snapshot => setVideo(snapshot.data()));
    return () => unsubscribe();
  }, [videoId, lectureId]);

  return (
    <div className='video'>
      <div className='video__container'>
        <video
          className='video__display'
          controls
          src={video?.videoUrl}
          type='video/mp4'></video>
        <div className='video__title'>{video?.caption}</div>
        <p className='video__description'>{video?.description}</p>
      </div>
    </div>
  );
}

export default Video;
