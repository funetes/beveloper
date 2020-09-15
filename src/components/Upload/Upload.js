import React, { useState, useEffect } from 'react';
import './Upload.css';
import storage from '../../firebase/storage';
import db from '../../firebase/db';
import Button from '@material-ui/core/Button';
function Upload() {
  // get lectures

  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    const unsubscription = db.collection('lectures').onSnapshot(snapshot => {
      setLectures(
        snapshot.docs.map(doc => ({ id: doc.id, lecture: doc.data() }))
      );
    });
    return () => {
      unsubscription();
    };
  }, [lectures]);
  const createLecture = () => {
    db.collection('lectures')
      .add({
        description: 1,
        instructor: 'kimhwan',
        price: 10000,
        thumbnail:
          'https://images.unsplash.com/photo-1598342687181-b85f6e6deccb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'css 뿌시기',
      })
      .then(_ => console.log('created'));
  };

  const handleChange = e => e.target.files[0] && setVideo(e.target.files[0]);

  const handleUpload = () => {
    if (video) {
      const splitName = video.name.split(':');
      const subject = splitName[0];
      const lectureName = splitName[1];
      const videoName = splitName[2];

      const uploadTask = storage
        .ref(`videos/${subject}/${lectureName}/${videoName}`)
        .put(video);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            // store to database
            console.log('File available at', downloadURL);
            console.log(db.collection('lectures'));
            setProgress(0);
            setVideo(null);
          });
        }
      );
    }
  };
  return (
    <div>
      {/* <progress value={progress} max='100' className='videoUpload__progress' /> */}
      {/* <input
        type='text'
        placeholder='Enter a caption...'
        onChange={e => setCaption(e.target.value)}
        value={caption}
      /> */}
      {/* <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button> */}
      <Button onClick={createLecture}>강의 만들기</Button>
      <ul>
        {lectures.map(({ id, lecture }) => (
          <li key={id}>{lecture.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Upload;
