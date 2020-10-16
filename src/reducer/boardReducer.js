import { createReducer } from '@reduxjs/toolkit';
import {
  uploadBoardRequest,
  uploadBoardSuccess,
  uploadBoardError,
  fatchBoardRequest,
  fatchBoardSuccess,
  fatchBoardError,
  addBoardCountRequest,
  addBoardCountSuccess,
  addBoardCountError,
} from '../action/boardAction';

const initialState = {
  loading: false,
  boards: [],
  error: null,
};
const boardReducer = createReducer(initialState, {
  [uploadBoardRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [uploadBoardSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [uploadBoardError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [fatchBoardRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [fatchBoardSuccess]: (state, action) => ({
    ...state,
    boards: [...action.payload],
    loading: false,
  }),
  [fatchBoardError]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [addBoardCountRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [addBoardCountSuccess]: (state, action) => ({
    ...state,
    boards: state.boards.map(board =>
      board.id === action.payload.id ? action.payload : board
    ),
  }),
  [addBoardCountError]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
});

export default boardReducer;
