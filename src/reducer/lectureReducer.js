import { createReducer } from '@reduxjs/toolkit';
import {
  fatchLectureRequest,
  fatchLectureSuccess,
  fatchLectureError,
} from '../action/lectureAction';

const initialState = {
  loading: false,
  lectures: [],
  error: null,
};

const lectureReducer = createReducer(initialState, {
  [fatchLectureRequest]: (state, _) => ({
    ...state,
    loading: false,
    lectures: [],
    error: null,
  }),
  [fatchLectureSuccess]: (state, action) => ({
    ...state,
    loading: false,
    lectures: action.payload,
    error: null,
  }),
  [fatchLectureError]: (state, action) => ({
    ...state,
    loading: false,
    lectures: [],
    erorr: action.payload,
  }),
});

export default lectureReducer;
