import React from 'react';
import './Contact.css';
import Notion from '../Notion/Notion';
import { useSelector } from 'react-redux';
import { notionKey } from '../../utils/notionKey';
const Contact = () => {
  const { darkmode } = useSelector(({ local }) => local);
  return (
    <main className='contact'>
      <Notion id={notionKey} checked={darkmode} />
    </main>
  );
};

export default Contact;
