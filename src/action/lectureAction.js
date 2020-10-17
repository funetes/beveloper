import db from '../firebase/db';
import { createAction } from '@reduxjs/toolkit';

export const fatchLectureRequest = createAction('fatch/FATCH_LECTURE_REQUEST');
export const fatchLectureSuccess = createAction('fatch/FATCH_LECTURE_SUCCESS');
export const fatchLectureError = createAction('fatch/FATCH_LECTURE_ERROR');

export const fatchLectures = () => {
  return async dispatch => {
    dispatch(fatchLectureRequest());
    try {
      const result = await db
        .collection('lectures')
        .orderBy('timestamp', 'desc')
        .get();
      const lectures = result.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fatchLectureSuccess(lectures));
    } catch (error) {
      dispatch(fatchLectureError(error.message));
    }
  };
};
