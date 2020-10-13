import React from 'react';
import './BoardContent.css';
import { useLocation } from 'react-router-dom';
const BoardContent = () => {
  const { state: board } = useLocation();
  console.log(board);
  return <div>BoardContent</div>;
};
export default BoardContent;
