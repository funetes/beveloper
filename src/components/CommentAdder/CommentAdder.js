import React, { useState } from 'react';
import './CommentAdder.css';
function CommentAdder({ videoId, lectureId }) {
  const [text, setText] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    console.log(text);
  };
  return (
    <div className='commentAdder'>
      <form onSubmit={onSubmit}>
        <textarea
          value={text}
          cols='100'
          rows='10'
          onChange={e => setText(e.target.value)}></textarea>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default CommentAdder;
