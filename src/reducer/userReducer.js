import { createReducer } from '@reduxjs/toolkit';
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  signupUserRequest,
  signupUserSuccess,
  signupUserError,
  providerLoginRequest,
  providerLoginSuccess,
  providerLoginError,
  logOutSuccess,
} from '../action/userAction';

const initialState = null;

const userReducer = createReducer(initialState, {
  [loginUserRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [loginUserSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [loginUserError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [signupUserRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [signupUserSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [signupUserError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [providerLoginRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [providerLoginSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [providerLoginError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [logOutSuccess]: () => null,
});

export default userReducer;
