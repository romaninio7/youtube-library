import * as types from '../actions/types';

const initialState = {
  fetching: true,
  videos: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.API_CALL_SEARCH_REQUEST:
      return { ...state, fetching: true };

    case types.API_CALL_SEARCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        videos: action.payload,
      };

    case types.API_CALL_SEARCH_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
