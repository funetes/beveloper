import { combineReducers } from 'redux';
import user from './userReducer';
import lectures from './lectureReducer';

export default combineReducers({
  user,
  lectures,
});
