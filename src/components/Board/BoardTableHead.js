import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { color } from '../../utils/style';
const BoardTableHead = () => {
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const style = { color: darkmode ? color.DARK : color.LIGHT };
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ ...style, width: '10%' }} align='left'>
          번호
        </TableCell>
        <TableCell style={{ ...style, width: '40%' }} align='center'>
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
  );
};

export default BoardTableHead;
