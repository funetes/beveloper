import { createReducer } from '@reduxjs/toolkit';
import * as localAction from '../action/localAction';
const intitalState = {
  darkmode: true,
};

const localReducer = createReducer(intitalState, {
  [localAction.checkDarkmode]: (state, action) => {
    localStorage.setItem('darkmode', action.payload);
    return { ...state, darkmode: action.payload };
  },
});

export default localReducer;
