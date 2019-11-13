import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const loading = () => ({ type: ITEMS_LOADING });

export const getItems = () => dispatch => {
  dispatch(loading());

  axios
    .get("/items")
    .then(res => {
      dispatch({ type: GET_ITEMS, payload: res.data });
    })
    .catch(({ response }) =>
      dispatch(returnErrors(response.data, response.status))
    );
};

export const addItem = name => (dispatch, getState) => {
  axios
    .post("/items", { name }, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_ITEM, payload: res.data });
    })
    .catch(({ response }) =>
      dispatch(returnErrors(response.data, response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`items/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({ type: DELETE_ITEM, payload: id });
    })
    .catch(({ response }) =>
      dispatch(returnErrors(response.data, response.status))
    );
};
