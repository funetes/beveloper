import React, { memo } from 'react';
import './FavoriteLectures.css';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const FavoriteLectures = ({ favorites, loading }) => {
  console.log(favorites, loading);
  return (
    <section className='FavoriteLectures'>
      <h1>즐겨찾기</h1>
      {loading ? (
        <Loading />
      ) : favorites?.length === 0 ? (
        <div>
          즐겨찾기가 없습니다.
          <span role='img' aria-labelledby='emoji'>
            😭
          </span>
        </div>
      ) : (
        <ul>
          {favorites?.map(
            ({ id, title, thumbnail, instructor, description }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `/lecture/${id}`,
                    state: {
                      thumbnail,
                      title,
                      instructor,
                      description,
                    },
                  }}>
                  <span>∙</span> {title}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};

export default memo(FavoriteLectures);
