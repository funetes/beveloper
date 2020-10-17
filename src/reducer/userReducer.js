import { createReducer } from '@reduxjs/toolkit';
import * as userAction from '../action/userAction';

const initialState = null;

const userReducer = createReducer(initialState, {
  [userAction.loginUserRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [userAction.loginUserSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [userAction.loginUserError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [userAction.signupUserRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [userAction.signupUserSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [userAction.signupUserError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [userAction.providerLoginRequest]: (state, _) => ({
    ...state,
    loading: true,
  }),
  [userAction.providerLoginSuccess]: (state, _) => ({
    ...state,
    loading: false,
  }),
  [userAction.providerLoginError]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [userAction.userInfo]: (state, action) => ({
    ...state,
    loading: false,
    displayName: action.payload.displayName,
    uid: action.payload.uid,
    photoURL: action.payload.photoURL,
    email: action.payload.email,
  }),
  [userAction.userInfoFromFB]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [userAction.addFavorite]: (state, action) => ({
    ...state,
    favorites: [...state.favorites, action.payload],
  }),
  [userAction.deleteFavorite]: (state, action) => ({
    ...state,
    favorites: [...state.favorites].filter(
      favorite => favorite !== action.payload
    ),
  }),
  [userAction.updateFavoriteError]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [userAction.editUserInfo]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [userAction.logOutAction]: () => null,
});

export default userReducer;
