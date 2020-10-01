import React from 'react';
import './Contact.css';
import Notion from '../Notion/Notion';
const Contact = ({ checked }) => {
  return (
    <div className='contact'>
      <Notion id='c79c313ff3274d15b53bfe46a2281bf6' checked={checked} />
    </div>
  );
};

export default Contact;
