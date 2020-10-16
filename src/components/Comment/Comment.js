import React from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import toDate from '../../utils/toDate';
import Button from '@material-ui/core/Button';

const Comment = ({
  comments,
  onDeleteClick,
  Reply,
  lectureId,
  chapterId,
  containerStyle,
}) => {
  const user = useSelector(({ user }) => user);

  return (
    <div className='comment'>
      {comments?.map(({ id, username, text, timestamp, creator }) => (
        <div className='comment__container' key={id} style={containerStyle}>
          <span className='comment__username'>{username}</span>
          <pre className='comment__text'>{text}</pre>
          <p className='comment__time'>{toDate(timestamp?.seconds)}</p>
          {user?.uid === creator && (
            <Button
              className='comment_button'
              onClick={() => onDeleteClick(id)}
              color='secondary'>
              del
            </Button>
          )}
          {Reply && (
            <Reply commentId={id} chapterId={chapterId} lectureId={lectureId} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
