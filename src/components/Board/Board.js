import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Board.css';
import TableContainer from '@material-ui/core/TableContainer';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { color, notionBgColor } from '../../utils/style';
import BoardTableRow from './BoardTableRow';
const Board = () => {
  const history = useHistory();
  const boards = useSelector(({ board: { boards } }) => boards);
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const style = { color: darkmode ? color.DARK : color.LIGHT };
  const onRowClick = board => {
    history.push({
      pathname: `/board/${board.id}`,
      state: {
        ...board,
      },
    });
  };
  return (
    <>
      <main className='board'>
        <h1>공지사항</h1>
        <TableContainer
          component={Paper}
          style={{
            margin: '2rem',
            width: 'auto',
            backgroundColor: darkmode ? '#424242' : notionBgColor.LIGHT,
          }}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell style={{ ...style, width: '10%' }} align='left'>
                  번호
                </TableCell>
                <TableCell style={{ ...style, width: '60%' }} align='center'>
                  제목
                </TableCell>
                <TableCell style={{ ...style, width: '13%' }} align='right'>
                  글쓴이
                </TableCell>
                <TableCell style={{ ...style, width: '10%' }} align='center'>
                  날짜
                </TableCell>
                <TableCell style={{ ...style, width: '7%' }} align='center'>
                  조회수
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boards.map((board, index) => (
                <BoardTableRow
                  key={board.id}
                  board={board}
                  darkmode={darkmode}
                  index={boards.length - index}
                  onRowClick={onRowClick}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default Board;
