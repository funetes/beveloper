import { createAction } from '@reduxjs/toolkit';
import auth from '../firebase/auth';
import db from '../firebase/db';
import firebase, { firestore } from 'firebase';

export const loginUserRequest = createAction('user/LOGIN_USER_REQUEST');
export const loginUserSuccess = createAction('user/LOGIN_USER_SUCCESS');
export const loginUserError = createAction('user/LOGIN_USER_ERROR');

export const login = (email, password) => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(loginUserSuccess());
    } catch (error) {
      dispatch(loginUserError(error.message));
    }
  };
};

export const signupUserRequest = createAction('user/SIGNUP_USER_REQUEST');
export const signupUserSuccess = createAction('user/SIGNUP_USER_SUCCESS');
export const signupUserError = createAction('user/SIGNUP_USER_ERROR');

export const signup = (email, password, username) => {
  return async dispatch => {
    try {
      dispatch(signupUserRequest());
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({
        displayName: username,
      });
      await db.collection('users').doc(user.uid).set({
        favorites: [],
        admin: false,
      });
      dispatch(signupUserSuccess());
    } catch (error) {
      dispatch(signupUserError(error.message));
    }
  };
};

export const providerLoginRequest = createAction('user/PROVIDER_LOGIN_REQUEST');
export const providerLoginSuccess = createAction('user/PROVIDER_LOGIN_SUCCESS');
export const providerLoginError = createAction('user/PROVIDER_LOGIN_ERROR');

export const providerLogin = provider => {
  return async dispatch => {
    try {
      dispatch(providerLoginRequest());
      let authProvider;
      if (provider === 'google') {
        authProvider = new firebase.auth.GoogleAuthProvider();
      } else if (provider === 'github') {
        authProvider = new firebase.auth.GithubAuthProvider();
      }
      const result = await firebase.auth().signInWithPopup(authProvider);
      const {
        user: { uid },
      } = result;
      const isInFireStore = await db.collection('users').doc(uid).get();
      !isInFireStore.data() &&
        (await db.collection('users').doc(uid).set({
          favorites: [],
          admin: false,
        }));
      dispatch(providerLoginSuccess());
    } catch (error) {
      dispatch(providerLoginError(error.message));
    }
  };
};

export const logOutAction = createAction('user/LOGOUT_ACTION');

export const logOut = () => {
  return async dispatch => {
    try {
      await auth.signOut();
      dispatch(logOutAction());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const userInfo = createAction('user/USER_INFO');

export const userInfoFromFB = createAction('user/USER_INFO_FROM_FB');

export const userInfoFB = uid => {
  return async dispatch => {
    const userInfoDoc = await db.collection('users').doc(uid).get();
    const userInfo = userInfoDoc.data();
    dispatch(userInfoFromFB(userInfo));
  };
};

export const userFavoriteUpdate = createAction('user/USER_FAVORITE_UPDATE');

export const addFavorite = createAction('user/ADD_FAVORITE');
export const deleteFavorite = createAction('user/DELETE_FAVORITE');
export const updateFavoriteError = createAction('user/UPDATE_FAVORITE_ERROR');

export const updateFavorite = (id, uid, isFavorite) => {
  return async dispatch => {
    try {
      const favoriteRef = db.collection('users').doc(uid);
      if (isFavorite) {
        await favoriteRef.update({
          favorites: firestore.FieldValue.arrayRemove(id),
        });
        dispatch(deleteFavorite(id));
      } else {
        await favoriteRef.update({
          favorites: firestore.FieldValue.arrayUnion(id),
        });
        dispatch(addFavorite(id));
      }
    } catch (error) {
      dispatch(updateFavoriteError(error.message));
    }
  };
};
