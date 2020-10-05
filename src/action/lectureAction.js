import db from '../firebase/db';
export const FATCH_LECTURE_REQUEST = 'fatch/FATCH_LECTURE_REQUEST';
export const FATCH_LECTURE_SUCCESS = 'fatch/FATCH_LECTURE_SUCCESS';
export const FATCH_LECTURE_ERROR = 'fatch/FATCH_LECTURE_ERROR';

const fatchLectureRequest = () => ({
  type: FATCH_LECTURE_REQUEST,
});

const fatchLectureSuccess = data => ({
  type: FATCH_LECTURE_SUCCESS,
  payload: data,
});

const fatchLectureError = error => ({
  type: FATCH_LECTURE_ERROR,
  payload: error,
});

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
