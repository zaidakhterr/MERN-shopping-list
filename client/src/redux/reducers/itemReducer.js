import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload),
      };

    default:
      return state;
  }
};
