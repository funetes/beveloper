import React, { useEffect, useState } from 'react';
import './LectureUpload.css';
import storage from '../../firebase/storage';
import firebase from 'firebase';
import db from '../../firebase/db';
import Input from '@material-ui/core/Input';
import { useParams } from 'react-router-dom';
const LectureUpload = () => {
  const { id } = useParams();
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(null);

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('lectures')
      .doc(id)
      .collection('videos')
      .onSnapshot(sanpshot => {
        setChapters(sanpshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, [id]);

  const handleChange = e => e.target.files[0] && setVideo(e.target.files[0]);

  const uploadLecture = () => {
    if (!video) {
      return;
    }
    const videoName = video.name.split(':');
    console.log(video);
    console.log(videoName);
    const subject = videoName[0];
    const chapter = videoName[1];
    //video upload to storage
    const uploadTask = storage.ref(`videos/${subject}/${chapter}`).put(video);
    uploadTask.on(
      'state_changed',
      snapShot => {
        const progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.error(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection('lectures').doc(id).collection('videos').add({
            caption,
            description,
            videoUrl: downloadURL,
            serverTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setProgress(0);
        });
      }
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    uploadLecture();
  };

  return (
    <>
      <progress
        value={progress}
        max='100'
        className='lectureUpload__progress'
      />
      <form className='LectureUpload' onSubmit={onSubmit}>
        <Input type='file' onChange={handleChange} />
        <Input
          type='text'
          placeholder='caption'
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
        <Input
          type='text'
          placeholder='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Input type='submit' />
      </form>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>{chapter.caption}</li>
        ))}
      </ul>
    </>
  );
};

export default LectureUpload;
