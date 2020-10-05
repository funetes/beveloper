import {
  FATCH_LECTURE_REQUEST,
  FATCH_LECTURE_SUCCESS,
  FATCH_LECTURE_ERROR,
} from '../action/lectureAction';

const initialState = {
  loading: false,
  lectures: [],
  error: null,
};

const lectureReducer = (state = initialState, action) => {
  switch (action.type) {
    case FATCH_LECTURE_REQUEST:
      return {
        loading: true,
        lectures: [],
        error: null,
      };
    case FATCH_LECTURE_SUCCESS:
      return {
        loading: false,
        lectures: action.payload,
        error: null,
      };
    case FATCH_LECTURE_ERROR:
      return {
        loading: false,
        lectures: [],
        erorr: action.payload,
      };
    default:
      return state;
  }
};

export default lectureReducer;
