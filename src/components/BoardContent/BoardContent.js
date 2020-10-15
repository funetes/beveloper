import React from 'react';
import './BoardContent.css';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import toDate from '../../utils/toDate';
const BoardContent = () => {
  const { state: board } = useLocation();
  return (
    <main className='boardContent'>
      <h1 className='boardContent__title'>{board.title}</h1>
      <span className='boardContent__time'>
        {toDate(board.timestamp?.seconds, { all: true })}
      </span>
      <div className='boardContent__content'>
        <ReactMarkdown source={board.description} escapeHtml={false} />
      </div>
      {/* 댓글 */}
    </main>
  );
};
export default BoardContent;
