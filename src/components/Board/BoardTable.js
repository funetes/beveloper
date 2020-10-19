import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import { Paper, Table, TableBody } from '@material-ui/core';
import { useStyles } from './style';
import BoardTableRow from './BoardTableRow';
import { notionBgColor } from '../../utils/style';
import BoardTableHead from './BoardTableHead';
import { addBoardCount } from '../../action/boardAction';
const BoardTable = ({ boards }) => {
  const history = useHistory();
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const dispatch = useDispatch();
  const style = {
    margin: '2rem 0',
    width: 'auto',
    backgroundColor: darkmode ? '#424242' : notionBgColor.LIGHT,
  };
  const { table } = useStyles();
  const onRowClick = board => {
    dispatch(addBoardCount(board));
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
