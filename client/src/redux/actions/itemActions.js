import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, LOADING } from './types';

export const loading = () => ({ type: LOADING });

export const getItems = () => dispatch => {
  dispatch(loading());

  axios.get('/items').then(res => {
    dispatch({ type: GET_ITEMS, payload: res.data });
  });
};

export const addItem = name => dispatch => {
  axios
    .post(
      '/items',
      { name },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(res => {
      dispatch({ type: ADD_ITEM, payload: res.data });
    });
};

export const deleteItem = id => dispatch => {
  axios.delete(`items/${id}`).then(res => {
    dispatch({ type: DELETE_ITEM, payload: id });
  });
};
