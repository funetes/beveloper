import React, { useEffect } from 'react';
import './Contact.css';
import Notion from '../Notion/Notion';
import { useSelector, useDispatch } from 'react-redux';
import { notionKey } from '../../utils/notionKey';
import { navToggle } from '../../action/localAction';
const Contact = () => {
  const dispatch = useDispatch();
  const { darkmode, smallNav } = useSelector(({ local }) => local);
  useEffect(() => {
    dispatch(navToggle(false));
  }, [dispatch]);

  return (
    <main className='contact' style={{ zIndex: smallNav ? '-1' : '0' }}>
      <Notion id={notionKey} checked={darkmode} />
    </main>
  );
};

export default Contact;
