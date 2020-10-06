import { createReducer } from '@reduxjs/toolkit';
import { checkDarkmode } from '../action/localAction';
const intitalState = {
  darkmode: false,
};

const localReducer = createReducer(intitalState, {
  [checkDarkmode]: (state, action) => {
    localStorage.setItem('darkmode', action.payload);
    return { ...state, darkmode: action.payload };
  },
});

export default localReducer;
