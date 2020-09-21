import React, { useEffect, useState } from 'react';
import './LectureUpload.css';
import { useParams, withRouter } from 'react-router-dom';

import storage from '../../firebase/storage';
import firebase from 'firebase';
import db from '../../firebase/db';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ChapterCollapse from '../ChapterCollapse/ChapterCollapse';
const LectureUpload = ({
  location: {
    state: { title },
  },
}) => {
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
      .orderBy('serverTimestamp', 'asc')
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
  const onClick = chapterId => {
    db.collection('lectures')
      .doc(id)
      .collection('videos')
      .doc(chapterId)
      .delete()
      .then(_ => console.log('deleted'));
  };
  const onSubmit = e => {
    e.preventDefault();
    uploadLecture();
  };

  return (
    <div className='lectureUpload'>
      <div className='lectureUpload__columns'>
        <progress
          value={progress}
          max='100'
          className='lectureUpload__progress'
        />
        <form className='lectureUpload__input' onSubmit={onSubmit}>
          <p>확장자는 .mp4만 | 파일명은 (subject / chapter) 형식으로.</p>
          <Input
            type='file'
            onChange={handleChange}
            accept='video/*'
            required
          />
          <Input
            type='text'
            placeholder='caption'
            value={caption}
            required
            onChange={e => setCaption(e.target.value)}
          />
          <Input
            type='text'
            placeholder='description'
            value={description}
            required
            onChange={e => setDescription(e.target.value)}
          />
          <Button type='submit' variant='contained' color='primary'>
            chapter upload
          </Button>
        </form>
      </div>
      <div className='lectureUpload__columns'>
        {title && <h2 className='lectureUpload__title'>{title}</h2>}
        <ul className='lectureUpload__list'>
          {chapters.length === 0 ? (
            <div>
              chatper가 없습니다{' '}
              <span role='img' aria-labelledby='emoji'>
                😭
              </span>
            </div>
          ) : (
            chapters.map(({ id, caption, description, serverTimestamp }) => (
              <li key={id} className='lectureUpload__item'>
                <div className='lectureUpload__itemColumn'>
                  <div>{caption}</div>
                  <Button
                    color='secondary'
                    onClick={() => {
                      onClick(id);
                    }}>
                    del
                  </Button>
                </div>

                <ChapterCollapse
                  description={description}
                  serverTimestamp={serverTimestamp}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(LectureUpload);
