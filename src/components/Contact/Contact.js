import React from 'react';
import './Contact.css';
import Notion from '../Notion/Notion';
import { useSelector } from 'react-redux';
const NOTIONID = 'c79c313ff3274d15b53bfe46a2281bf6';

const Contact = () => {
  const { darkmode } = useSelector(({ local }) => local);
  return (
    <main className='contact'>
      <Notion id={NOTIONID} checked={darkmode} />
    </main>
  );
};

export default Contact;
