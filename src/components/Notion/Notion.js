import React, { useState, useEffect } from 'react';
import 'react-notion/src/styles.css';
import { NotionRenderer } from 'react-notion';
import './Notion.css';
const Notion = ({ id, checked }) => {
  const [notionData, setNotionData] = useState(null);
  useEffect(() => {
    const getNotionData = async () => {
      try {
        const data = await fetch(
          `https://notion-api.splitbee.io/v1/page/${id}`
        ).then(res => res.json());
        setNotionData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getNotionData();
  }, [id]);
  // rgba(51, 51, 51, 0.9);
  return (
    <div
      className='notion__container'
      style={{
        backgroundColor: checked ? 'rgb(55, 55, 55)' : 'rgb(250,250,250)',
      }}>
      {notionData && <NotionRenderer blockMap={notionData} />}
    </div>
  );
};

export default Notion;
