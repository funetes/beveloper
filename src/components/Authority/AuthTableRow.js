import React, { useState } from 'react';
import db from '../../firebase/db';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { color } from '../../utils/style';
const AuthTableRow = ({ user, darkmode }) => {
  const [userInfo, setUserInfo] = useState(user);
  const onChange = async (e, id) => {
    const {
      target: { checked },
    } = e;
    await db.collection('users').doc(id).update({
      admin: checked,
    });
    setUserInfo(prevUser => ({
      ...prevUser,
      admin: checked,
    }));
  };
  const style = {
    color: darkmode ? color.DARK : color.LIGHT,
  };
  return (
    <TableRow key={userInfo.id}>
      <TableCell style={style} component='th' scope='row' align='center'>
        {userInfo.email}
      </TableCell>
      <TableCell style={style} align='center'>
        {userInfo.id}
      </TableCell>
      <TableCell style={style} align='center'>
        <input
          style={{ width: '20%' }}
          type='checkbox'
          checked={userInfo.admin}
          onChange={e => onChange(e, userInfo.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default AuthTableRow;
