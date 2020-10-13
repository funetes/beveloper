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
      const result = await db
        .collection('boards')
        .orderBy('timestamp', 'desc')
        .get();
      const boards = result.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fatchBoardSuccess(boards));
    } catch (error) {
      dispatch(fatchBoardError(error.message));
    }
  };
};
