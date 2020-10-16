import { createAction } from '@reduxjs/toolkit';
import db from '../firebase/db';

export const uploadBoardRequest = createAction('board/UPLOAD_BORAD_REQUEST');
export const uploadBoardSuccess = createAction('board/UPLOAD_BORAD_SUCCESS');
export const uploadBoardError = createAction('board/UPLOAD_BORAD_ERROR');

export const uploadBoard = board => {
  return async dispatch => {
    try {
      dispatch(uploadBoardRequest());
      await db.collection('boards').add(board);
      dispatch(uploadBoardSuccess());
      dispatch(fatchBoards());
    } catch (error) {
      dispatch(uploadBoardError(error.message));
    }
  };
};

export const fatchBoardRequest = createAction('board/FATCH_BOARD_REQUEST');
export const fatchBoardSuccess = createAction('board/FATCH_BOARD_SUCCESS');
export const fatchBoardError = createAction('board/FATCH_BOARD_ERROR');

export const fatchBoards = () => {
  return async dispatch => {
    dispatch(fatchBoardRequest());
    try {
      const firstboards = db.collection('boards').orderBy('timestamp', 'desc');
      const documentSnapshots = await firstboards.get();

      const boards = documentSnapshots.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fatchBoardSuccess(boards));
    } catch (error) {
      dispatch(fatchBoardError(error.message));
    }
  };
};

export const addBoardCountRequest = createAction(
  'board/ADD_BORAD_COUNT_REQUEST'
);
export const addBoardCountSuccess = createAction(
  'board/ADD_BORAD_COUNT_SUCCESS'
);
export const addBoardCountError = createAction('board/ADD_BORAD_COUNT_ERROR');

export const addBoardCount = board => {
  return async dispatch => {
    try {
      dispatch(addBoardCountRequest());
      await db
        .collection('boards')
        .doc(board.id)
        .update({
          counter: board.counter + 1,
        });
      dispatch(addBoardCountSuccess({ ...board, counter: board.counter + 1 }));
    } catch (error) {
      dispatch(addBoardCountError(error.message));
    }
  };
};
