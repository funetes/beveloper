import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { color } from '../../utils/style';
import toDate from '../../utils/toDate';
const BoardTableRow = ({ board, darkmode, index, onRowClick }) => {
  const darkmodSstyle = {
    color: darkmode ? color.DARK : color.LIGHT,
  };

  return (
    <TableRow
      onClick={() => {
        onRowClick(board);
      }}>
      <TableCell
        style={{ ...darkmodSstyle, width: '10%' }}
        component='th'
        scope='row'
        align='left'>
        {index}
      </TableCell>
      <TableCell style={{ ...darkmodSstyle, width: '60%' }} align='center'>
        {board.title}
      </TableCell>
      <TableCell style={{ ...darkmodSstyle, width: '13%' }} align='right'>
        {board.username}
      </TableCell>
      <TableCell style={{ ...darkmodSstyle, width: '10%' }} align='right'>
        {toDate(board.timestamp?.seconds)}
      </TableCell>
      <TableCell style={{ ...darkmodSstyle, width: '7%' }} align='right'>
        {board.counter}
      </TableCell>
    </TableRow>
  );
};

export default BoardTableRow;
