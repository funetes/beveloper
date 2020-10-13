import { combineReducers } from 'redux';
import user from './userReducer';
import lecture from './lectureReducer';
import local from './localReducer';
import board from './boardReducer';

export default combineReducers({
  user,
  lecture,
  local,
  board,
});
