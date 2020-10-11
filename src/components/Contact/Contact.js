import React from 'react';
import './Contact.css';
import Notion from '../Notion/Notion';
import { useSelector } from 'react-redux';
const NOTIONID = '0748479ad7254d9d8649d5f017fc7ce8';
const Contact = () => {
  const { darkmode } = useSelector(({ local }) => local);
  return (
    <main className='contact'>
      {/* <Notion id={NOTIONID} checked={darkmode} /> */}
    </main>
  );
};

export default Contact;
