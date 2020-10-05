import {
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../action/userAction';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SIGNUP_USER_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_USER_SUCCESS:
      return { ...state, loading: false };
    case SIGNUP_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
