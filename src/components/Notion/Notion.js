import React, { useState, useEffect } from 'react';
import 'react-notion/src/styles.css';
import './Notion.css';
import { NotionRenderer } from 'react-notion';
import { notionBgColor } from '../../utils/style';
import axios from 'axios';
import Logo from '../Logo/Logo';
const Notion = ({ id, checked }) => {
  const [notionData, setNotionData] = useState(null);

  useEffect(() => {
    let cancel;
    axios
      .get(`https://notion-api.splitbee.io/v1/page/${id}`, {
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      })
      .then(({ data }) => setNotionData(data))
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [id]);

  return (
    <>
      {notionData ? (
        <div
          className='notion__container'
          style={{
            backgroundColor: checked ? notionBgColor.DARK : notionBgColor.LIGHT,
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
