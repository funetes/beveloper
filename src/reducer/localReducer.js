import { createReducer } from '@reduxjs/toolkit';
import * as localAction from '../action/localAction';
const intitalState = {
  darkmode: true,
  sidebar: false,
  hamburger: false,
  smallNav: false,
};

const localReducer = createReducer(intitalState, {
  [localAction.checkDarkmode]: (state, action) => {
    localStorage.setItem('darkmode', action.payload);
    return { ...state, darkmode: action.payload };
  },
  [localAction.sidebarIcon]: (state, action) => ({
    ...state,
    sidebar: action.payload,
  }),
  [localAction.hamburgerIcon]: (state, action) => ({
    ...state,
    hamburger: action.payload,
  }),
  [localAction.navToggle]: (state, action) => ({
    ...state,
    smallNav: action.payload,
  }),
});

export default localReducer;
