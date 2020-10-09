import React, { useState } from 'react';
import './Lecture.css';
import { useParams, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';
import Sidebar from '../../Sidebar/Sidebar';
import LectureIntro from '../LectureIntro/LectureIntro';

const Lecture = ({
  location: {
    state: { thumbnail, title, description },
  },
}) => {
  const { id: lectureId } = useParams();
  const [chapterId, setChapterId] = useState('');

  const onClick = chapterId => setChapterId(chapterId);

  return (
    <>
      <Helmet>
        <title>{`Beveloper | ${title}`}</title>
      </Helmet>
      <main className='lecture'>
        <Sidebar onClick={onClick} lectureId={lectureId} />
        <div className='lecture__videoAndComment'>
          {chapterId ? (
            <Video chapterId={chapterId} lectureId={lectureId} />
          ) : (
            <LectureIntro
              thumbnail={thumbnail}
              title={title}
              description={description}
              lectureId={lectureId}
            />
          )}
          {chapterId && (
            <section>
              <CommentAdder chapterId={chapterId} lectureId={lectureId} />
              <Comment chapterId={chapterId} lectureId={lectureId} />
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default withRouter(Lecture);
