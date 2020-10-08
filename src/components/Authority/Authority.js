import React, { useState, useEffect } from 'react';
import db from '../../firebase/db';
import './Authority.css';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import AuthTableRow from './AuthTableRow';
import { notionBgColor, color } from '../../utils/style';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Authority = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  useEffect(() => {
    console.log('ue');
    const getUsersFromFB = async () => {
      try {
        setLoading(true);
        const result = await db.collection('users').get();
        const userArr = result.docs.map(doc => ({
          id: doc.id,
          email: doc.data().id,
          admin: doc.data().admin,
        }));
        setUsers(userArr);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsersFromFB();
  }, []);

  return (
    <main className='authority'>
      <h1>유저 권한 설정</h1>
      {loading ? (
        <Loading />
      ) : (
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
                {['Email', 'Uid', 'Admin'].map((item, i) => (
                  <TableCell
                    key={i}
                    style={{ color: darkmode ? color.DARK : color.LIGHT }}
                    align='center'>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <AuthTableRow key={user.id} user={user} darkmode={darkmode} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
};

export default Authority;
