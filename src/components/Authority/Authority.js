import React, { useState, useEffect } from 'react';
import db from '../../firebase/db';
import './Authority.css';
import Loading from '../Loading/Loading';
import AuthUser from '../AuthUser/AuthUser';

const Authority = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
      {loading ? (
        <Loading />
      ) : (
        users.map(user => <AuthUser key={user.id} user={user} />)
      )}
    </main>
  );
};

export default Authority;
