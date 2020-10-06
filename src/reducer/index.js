import { combineReducers } from 'redux';
import user from './userReducer';
import lectures from './lectureReducer';
import local from './localReducer';

export default combineReducers({
  user,
  lectures,
  local,
});
