import { createReducer } from '@reduxjs/toolkit';
import * as boardAction from '../action/boardAction';

const initialState = {
  loading: false,
  boards: [],
  error: null,
};
const boardReducer = createReducer(initialState, {
  [boardAction.uploadBoardRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [boardAction.uploadBoardSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [boardAction.uploadBoardError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [boardAction.fatchBoardRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [boardAction.fatchBoardSuccess]: (state, action) => ({
    ...state,
    boards: [...action.payload],
    loading: false,
  }),
  [boardAction.fatchBoardError]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  [boardAction.addBoardCountRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [boardAction.addBoardCountSuccess]: (state, action) => ({
    ...state,
    boards: state.boards.map(board =>
      board.id === action.payload.id ? action.payload : board
    ),
  }),
  [boardAction.addBoardCountError]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
});

export default boardReducer;
