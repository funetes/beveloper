import React, { useState, useEffect } from 'react';
import './LectureIntro.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaDonate, FaRegStar, FaStar } from 'react-icons/fa';
import { updateFavorite } from '../../action/userAction';
const LectureIntro = ({ thumbnail, title, description, lectureId }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (user) {
      const favorites = user?.favorites;
      setIsFavorite(favorites?.some(favorite => favorite === lectureId));
    }
  }, [user, lectureId]);

  const onFavoriteBtnClick = () => {
    const isFavorite = user.favorites.some(favorite => favorite === lectureId);
    dispatch(updateFavorite(lectureId, user.uid, isFavorite));
  };
  const onDonateBtnClick = () => {
    console.log('onDonateBtnClick ==> moveto donate link');
  };
  return (
    <section className='lectureIntro'>
      <div className='lectureIntro__Container'>
        <img src={thumbnail} alt='thumbnail' />
        <div className='lectureIntro__buttonContainer'>
          <button
            onClick={onFavoriteBtnClick}
            disabled={!user ? true : false}
            style={{ color: !user && '#D3D3D3' }}>
            {user ? isFavorite ? <FaStar /> : <FaRegStar /> : <FaRegStar />}
          </button>
          <button onClick={onDonateBtnClick}>
            <FaDonate />
          </button>
        </div>
        <div className='lectureIntro__info'>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default LectureIntro;
