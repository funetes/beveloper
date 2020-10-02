import React, { useState, useEffect } from 'react';
import 'react-notion/src/styles.css';
import { NotionRenderer } from 'react-notion';
import './Notion.css';
import { bgColor } from '../../utils/style';
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
      } finally {
      }
    };
    getNotionData();
  }, [id]);

  return (
    <div
      className='notion__container'
      style={{
        backgroundColor: checked ? bgColor.DARK : bgColor.LIGHT,
      }}>
      {notionData && (
        <>
          <h1>
            hireable:{' '}
            <span role='img' aria-label='checked emoji'>
              ✅
            </span>
          </h1>
          <NotionRenderer blockMap={notionData} />
        </>
      )}
    </div>
  );
};

export default Notion;
