import React, { useState, useEffect } from 'react';
import './Video.css';
import db from '../../firebase/db';

const Video = ({ chapterId, lectureId }) => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    const getVideoFromFB = async () => {
      try {
        const videoDoc = await db
          .collection('lectures')
          .doc(lectureId)
          .collection('videos')
          .doc(chapterId)
          .get();
        const video = videoDoc.data();
        setVideo(video);
      } catch (error) {
        console.error(error.error);
      }
    };
    getVideoFromFB();
  }, [chapterId, lectureId]);

  return (
    <section className='video'>
      <div className='video__container'>
        <video
          className='video__display'
          controls
          autoPlay
          playsInline
          src={video?.videoUrl}
          type='video/mp4'
        />
        <div className='video__title'>{video?.caption}</div>
        <p className='video__description'>{video?.description}</p>
      </div>
    </section>
  );
};

export default Video;
