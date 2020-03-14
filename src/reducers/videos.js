import * as types from '../constants/actions';

const initialState = {
    fetching: true,
    videos: {"items":[]},
    error: null
  };
  
 function getVideos(state = initialState, action) {
    switch (action.type) {
      case types.API_CALL_REQUEST:
        return { ...state, fetching: true, error: null };
        break;
      case types.API_CALL_SEARCH_REQUEST:
        return { ...state, fetching: true, error: null, query: action.query };
        break;
      case types.API_CALL_SUCCESS:
        return { ...state, fetching: false, videos: action.videos };
        break;
      case types.API_CALL_SEARCH_SUCCESS:
          return { ...state, fetching: false, videos: action.videos };
          break;  
      case types.API_CALL_FAILURE:
        return { ...state, fetching: false, videos:  {"items":[]}, error: action.error };
        break;
      case types.API_CALL_SEARCH_FAILURE:
        return { ...state, fetching: false, videos:  {"items":[]}, error: action.error };
        break;
      default:
        return state;
    }
  }

  export default getVideos;