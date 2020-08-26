import React, { useState, useEffect, useRef } from 'react';
import './Video.css';
import db from '../../firebase/db';

function Video({ videoId, lectureId }) {
  const firstUpdate = useRef(true);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    db.collection('lectures')
      .doc(lectureId)
      .collection('videos')
      .doc(videoId)
      .onSnapshot(snapshot => setVideo(snapshot.data()));
  }, [videoId, lectureId]);

  return (
    <div className='video'>
      {videoId ? (
        <div className='video__container'>
          <video
            className='video__display'
            controls
            src={video?.videoUrl}
            type='video/mp4'></video>
          <div className='video__title'>{video?.caption}</div>
          <p className='video__description'>{video?.description}</p>
        </div>
      ) : (
        'no video'
      )}
    </div>
  );
}

export default Video;
