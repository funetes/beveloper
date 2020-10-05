import db from '../firebase/db';
import { createAction } from '@reduxjs/toolkit';

export const fatchLectureRequest = createAction('fatch/FATCH_LECTURE_REQUEST');
export const fatchLectureSuccess = createAction('fatch/FATCH_LECTURE_SUCCESS');
export const fatchLectureError = createAction('fatch/FATCH_LECTURE_ERROR');

export const fatchLectures = () => {
  return async function (dispatch) {
    dispatch(fatchLectureRequest());
    try {
      const result = db
        .collection('lectures')
        .orderBy('timestamp', 'desc')
        .get();
      const lectures = (await result).docs.map(doc => ({
        id: doc.id,
        lecture: doc.data(),
      }));
      dispatch(fatchLectureSuccess(lectures));
    } catch (error) {
      dispatch(fatchLectureError(error.message));
    }
  };
};
