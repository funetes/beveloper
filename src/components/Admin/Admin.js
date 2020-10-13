import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { FaUpload, FaClipboard } from 'react-icons/fa';
import { SiAuthy } from 'react-icons/si';
import { useSelector } from 'react-redux';

const Admin = ({ history }) => {
  const user = useSelector(({ user }) => user);
  useEffect(() => {
    !user && history.push('/');
  }, [user, history]);
  return (
    <main className='admin'>
      <h1>ADMIN</h1>
      <section className='admin__container'>
        <Link to='/admin/upload'>
          <FaUpload />
          <span>강의 업로드</span>
        </Link>
        <Link to='/admin/authority'>
          <SiAuthy />
          <span>유저 권한설정</span>
        </Link>
        <Link to='/admin/board'>
          <FaClipboard />
          <span>공지사항 업로드</span>
        </Link>
      </section>
    </main>
  );
};

export default Admin;
