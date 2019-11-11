import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get('auth/user', tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
      dispatch({ type: AUTH_ERROR });
    });
};

//setup config/headers
export const tokenConfig = getState => {
  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //if token add header
  if (token) config.headers['x-auth-token'] = token;

  return config;
};
