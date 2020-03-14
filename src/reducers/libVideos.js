import * as types from '../constants/actions';

const initialState = {
    fetching: true,
    libVideos: {"items":[]},
    error: null
  };
  
 function getLibVideos(state = initialState, action) {
    switch (action.type) {
      case types.API_CALL_LIB_REQUEST:
        return { ...state, fetching: true, error: null };
        break;
      case types.API_CALL_LIB_SUCCESS:
        return { ...state, fetching: false, libVideos: action.libVideos };
        break;
      case types.API_CALL_LIB_FAILURE:
        return { ...state, fetching: false, libVideos: {"items":[]}, error: action.error };
        break;
        case types.API_ADD_TO_LIB_REQUEST:
          return { ...state, fetching: true, error: null, addId: action.addId };
          break;
        case types.API_ADD_TO_LIB_SUCCESS:
          return { ...state, fetching: false, libVideos: action.libVideos };
          break;
        case types.API_ADD_TO_LIB_FAILURE:
          return { ...state, fetching: false, libVideos: {"items":[]}, error: action.error };
          break;  
          case types.API_DELETE_VIDEO_REQUEST:
            return { ...state, fetching: true, error: null, deleteId: action.deleteId };
            break;
          case types.API_DELETE_VIDEO_SUCCESS:
            return { ...state, fetching: false, libVideos: action.libVideos };
            break;
          case types.API_DELETE_VIDEO_FAILURE:
            return { ...state, fetching: false, libVideos: {"items":[]}, error: action.error };
            break;    
      default:
        return state;
    }
  }

  export default getLibVideos;