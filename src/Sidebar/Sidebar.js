import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import SidebarContent from '../components/SidebarContent/SidebarContent';
import db from '../firebase/db';
import './Sidebar.css';
const Sidebar = ({ onClick, lectureId }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const chapterFromFB = async () => {
      try {
        const result = await db
          .collection('lectures')
          .doc(lectureId)
          .collection('videos')
          .orderBy('serverTimestamp', 'asc')
          .get();
        const chapters = result.docs.map(doc => ({
          id: doc.id,
          caption: doc.data().caption,
        }));
        setChapters(chapters);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    chapterFromFB();
  }, [lectureId]);
  return (
    <section className='sidebar'>
      {loading ? (
        <Loading />
      ) : chapters.length === 0 ? (
        <div>
          chapter가 없습니다.
          <span role='img' aria-labelledby='emoji'>
            😭
          </span>
        </div>
      ) : (
        chapters.map(({ caption, id }) => (
          <SidebarContent
            key={id}
            id={id}
            caption={caption}
            onclick={onClick}
          />
        ))
      )}
    </section>
  );
};

export default Sidebar;
