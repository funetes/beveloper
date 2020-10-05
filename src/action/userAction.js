import auth from '../firebase/auth';
export const LOGIN_USER_REQUEST = 'user/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'user/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'user/LOGIN_USER_ERROR';

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});
export const loginUserSuccess = () => ({
  type: LOGIN_USER_REQUEST,
});
export const loginUserError = error => ({
  type: LOGIN_USER_REQUEST,
  payload: error,
});

export const loginUser = (email, password) => {
  return async function (dispatch) {
    try {
      dispatch(loginUserRequest());
      await auth.signInWithEmailAndPassword(email, password);
      // setSignInOpen(false);
      dispatch(loginUserSuccess());
    } catch (error) {
      dispatch(loginUserError(error.message));
    }
  };
};

export const SIGNUP_USER_REQUEST = 'user/SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'user/SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_ERROR = 'user/SIGNUP_USER_ERROR';

const signupUserRequest = () => ({ type: SIGNUP_USER_REQUEST });
const signupUserSuccess = () => ({ type: SIGNUP_USER_SUCCESS });
const signupUserError = error => ({ type: SIGNUP_USER_ERROR, payload: error });

// firestore에 user정보를 따로 담아야 하는데, 방법을 찾아야겠음
export const signupUser = (email, password, username) => {
  return async function (dispatch) {
    try {
      dispatch(signupUserRequest());
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await authUser.user.updateProfile({
        displayName: username,
      });
      dispatch(signupUserSuccess());
    } catch (error) {
      dispatch(signupUserError(error.message));
    }
  };
};
