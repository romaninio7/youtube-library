import * as types from '../actions/types';

const initialState = {
  fetching: true,
  libraryVideos: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.API_CALL_LIB_REQUEST:
      return { ...state, fetching: true, error: null };

    case types.API_CALL_LIB_SUCCESS:
      console.log('action.payload', action.payload);
      return {
        ...state,
        fetching: false,
        libraryVideos: action.payload,
      };

    case types.API_CALL_LIB_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case types.API_ADD_TO_LIB_REQUEST:
      return { ...state, fetching: true, error: null };

    case types.API_ADD_TO_LIB_SUCCESS:
      return { ...state, fetching: false, libraryVideos: action.payload };

    case types.API_ADD_TO_LIB_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case types.API_DELETE_VIDEO_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case types.API_DELETE_VIDEO_SUCCESS:
      const newLibraryVideos = state.libraryVideos.filter(
        (video) => video.id !== action.payload
      );
      console.log('newLibraryVideos', newLibraryVideos);
      return { ...state, fetching: false, libraryVideos: newLibraryVideos };

    case types.API_DELETE_VIDEO_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
