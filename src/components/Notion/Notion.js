import React, { useState, useEffect } from 'react';
import 'react-notion/src/styles.css';
import './Notion.css';
import { NotionRenderer } from 'react-notion';
import { bgColor } from '../../utils/style';
import api from '../../utils/api';
import Logo from '../Logo/Logo';
const Notion = ({ id, checked }) => {
  const [notionData, setNotionData] = useState(null);
  useEffect(() => {
    const getNotionData = async () => {
      try {
        const data = await api.getNotionPage(id);
        setNotionData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getNotionData();
  }, [id]);

  return (
    <>
      {notionData ? (
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
      ) : (
        <Logo />
      )}
    </>
  );
};

export default Notion;
