import React from 'react';
import './CommentAdder.css';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

const CommentAdder = ({ text, setText, onSubmit, formStyle }) => {
  const user = useSelector(({ user }) => user);
  return (
    <div className='commentAdder'>
      <form
        className='commentAdder__form'
        onSubmit={onSubmit}
        style={formStyle}>
        <textarea
          className='commentAdder__textarea'
          value={text}
          cols='90'
          rows='5'
          required
          disabled={user?.uid ? false : true}
          placeholder={
            user?.uid ? '댓글달기' : '로그인하시면 댓글을 달 수 있습니다.'
          }
          onChange={e => setText(e.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={user?.uid ? false : true}>
          add
        </Button>
      </form>
    </div>
  );
};

export default CommentAdder;
