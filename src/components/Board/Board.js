import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navToggle } from '../../action/localAction';
import './Board.css';
import BoardTable from './BoardTable';
import Pagination from './Pagination';
const Board = () => {
  const boards = useSelector(({ board: { boards } }) => boards);
  const dispatch = useDispatch();
  const boardsWithNumber = boards.map((board, index, boards) => ({
    ...board,
    number: boards.length - index,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastPage = currentPage * boardPerPage;
  const indexOfFirstPage = indexOfLastPage - boardPerPage;

  const currentBoards = boardsWithNumber.slice(
    indexOfFirstPage,
    indexOfLastPage
  );
  const clickPage = (_, value) => setCurrentPage(value);

  useEffect(() => {
    dispatch(navToggle(false));
  }, [dispatch]);

  return (
    <main className='board'>
      <h1>공지사항</h1>
      <BoardTable boards={currentBoards} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={boards.length}
        clickPage={clickPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Board;
