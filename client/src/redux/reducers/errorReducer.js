import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return { ...payload };

    case CLEAR_ERRORS:
      return { ...initialState };

    default:
      return state;
  }
};
