import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import { Paper, Table, TableBody } from '@material-ui/core';
import { useStyles } from './style';
import BoardTableRow from './BoardTableRow';
import { notionBgColor } from '../../utils/style';
import BoardTableHead from './BoardTableHead';
const BoardTable = ({ boards }) => {
  const history = useHistory();
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const style = {
    margin: '2rem',
    width: 'auto',
    backgroundColor: darkmode ? '#424242' : notionBgColor.LIGHT,
  };
  const { table } = useStyles();
  const onRowClick = board => {
    history.push({
      pathname: `/board/${board.id}`,
      state: {
        ...board,
      },
    });
  };
  return (
    <TableContainer component={Paper} style={style}>
      <Table className={table} aria-label='simple table'>
        <BoardTableHead />
        <TableBody>
          {boards.map(board => (
            <BoardTableRow
              key={board.id}
              board={board}
              darkmode={darkmode}
              index={board.number}
              onRowClick={onRowClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoardTable;
