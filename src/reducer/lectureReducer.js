import { createReducer } from '@reduxjs/toolkit';
import * as lectureAction from '../action/lectureAction';

const initialState = {
  loading: false,
  lectures: [],
  error: null,
};

const lectureReducer = createReducer(initialState, {
  [lectureAction.fatchLectureRequest]: (state, _) => ({
    ...state,
    loading: false,
    lectures: [],
    error: null,
  }),
  [lectureAction.fatchLectureSuccess]: (state, action) => ({
    ...state,
    loading: false,
    lectures: action.payload,
    error: null,
  }),
  [lectureAction.fatchLectureError]: (state, action) => ({
    ...state,
    loading: false,
    lectures: [],
    erorr: action.payload,
  }),
});

export default lectureReducer;
