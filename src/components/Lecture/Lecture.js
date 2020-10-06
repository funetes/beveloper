import React, { useState, useEffect } from 'react';
import './Lecture.css';
import { useParams, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import db from '../../firebase/db';

import SidebarContent from '../SidebarContent/SidebarContent';
import Video from '../Video/Video';
import Comment from '../Comment/Comment';
import CommentAdder from '../CommentAdder/CommentAdder';
import { FaRegStar, FaStar, FaDonate } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorite } from '../../action/userAction';
const Lecture = ({
  location: {
    state: { thumbnail, title, description },
  },
}) => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [lecture, setLecture] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const onClick = id => setVideoId(id);

  useEffect(() => {
    if (user) {
      const favorites = user?.favorites;
      setIsFavorite(favorites?.some(favorite => favorite === id));
    }
  }, [user, id]);

  useEffect(() => {
    setLoading(true);
    const chapterFromFB = async () => {
      try {
        const result = db
          .collection('lectures')
          .doc(id)
          .collection('videos')
          .orderBy('serverTimestamp', 'asc')
          .get();
        const chapters = (await result).docs.map(doc => ({
          id: doc.id,
          caption: doc.data().caption,
        }));
        setLecture(chapters);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    chapterFromFB();
  }, [id]);
  const onFavoriteBtnClick = async () => {
    const isFavorite = user.favorites.some(favorite => favorite === id);
    dispatch(updateFavorite(id, user.uid, isFavorite));
  };
  const onDonateBtnClick = () => {
    console.log('onDonateBtnClick ==> moveto donate link');
  };
  return (
    <>
      <Helmet>
        <title>{`Beveloper | ${title}`}</title>
      </Helmet>
      <main className='lecture'>
        <section className='lecture__sidebar'>
          {loading ? (
            <Loading />
          ) : lecture.length === 0 ? (
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
        </section>
        <div className='lecture__videoAndComment'>
          {videoId ? (
            <Video videoId={videoId} lectureId={id} />
          ) : (
            <section className='lecture__intro'>
              <div className='lecture__introContainer'>
                <img src={thumbnail} alt='thumbnail' />
                <div className='lecture__buttonContainer'>
                  <button
                    onClick={onFavoriteBtnClick}
                    disabled={!user ? true : false}
                    style={{ color: !user && '#D3D3D3' }}>
                    {user ? (
                      isFavorite ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                  <button onClick={onDonateBtnClick}>
                    <FaDonate />
                  </button>
                </div>
                <div className='lecture__info'>
                  <h1>{title}</h1>
                  <p>{description}</p>
                </div>
              </div>
            </section>
          )}
          {videoId && (
            <section>
              <CommentAdder videoId={videoId} lectureId={id} user={user} />
              <Comment videoId={videoId} lectureId={id} user={user} />
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default withRouter(Lecture);
