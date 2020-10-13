import React, { useState } from 'react';
import './BoardEditor.css';
import { withRouter } from 'react-router-dom';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import { bgColor } from '../../utils/style';
import { Button } from '@material-ui/core';
import db from '../../firebase/db';
import firebase from 'firebase';
import { BiArrowBack } from 'react-icons/bi';
const BoardEditor = ({ history }) => {
  const darkmode = useSelector(({ local: { darkmode } }) => darkmode);
  const user = useSelector(({ user }) => user);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState('');
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const onSubmit = e => {
    e.preventDefault();
    if (title === '') {
      return;
    }
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    if (markup === '') {
      return;
    }
    const board = {
      creater: user.email,
      uid: user.uid,
      title: title,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      description: markup,
      username: user.displayName,
    };
    try {
      db.collection('boards').add(board);
      // TODO: update store
    } catch (error) {
      console.error(error.message);
    } finally {
      setTitle('');
      setEditorState(() => EditorState.createEmpty());
    }
  };
  return (
    <main className='boardEditor'>
      <div className='boardEditor__titleWrapper'>
        <h1>공지사항 업로드</h1>
        <button onClick={history.goBack}>
          <BiArrowBack />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          placeholder='title'
          className='boardEditor__title'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder='add content'
          toolbarStyle={{
            backgroundColor: darkmode ? bgColor.DARK : bgColor.LIGHT,
          }}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        <Button
          type='submit'
          color='primary'
          variant='outlined'
          className='boardEditor__submitBtn'>
          글쓰기
        </Button>
      </form>
    </main>
  );
};

export default withRouter(BoardEditor);
