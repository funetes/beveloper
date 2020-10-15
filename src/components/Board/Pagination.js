import React from 'react';
import { useStyles } from './style';
import Mpagination from '@material-ui/lab/Pagination';
import './Pagination.css';
const Pagination = ({ boardPerPage, totalBoards, clickPage, currentPage }) => {
  const { paginationRoot } = useStyles();
  const pageNumber = Math.ceil(totalBoards / boardPerPage);
  return (
    <div className={paginationRoot}>
      <Mpagination count={pageNumber} page={currentPage} onChange={clickPage} />
    </div>
  );
};

export default Pagination;
