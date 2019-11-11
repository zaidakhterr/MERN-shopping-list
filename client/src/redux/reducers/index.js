import { combineReducers } from 'redux';
import item from './itemReducer';
import error from './errorReducer';
import auth from './authReducer';

export default combineReducers({
  item,
  error,
  auth,
});
