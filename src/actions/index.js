import * as types from './types';
import youtubeAPI from '../apis/youtube';
import libraryAPI from '../apis/library';

const KEY_YOUTUBE = 'AIzaSyCGHsLgdxjqsHjQx3oFYHMD1eFYdF2b-Cw';

// Action creater for fetch youtube videos
export const fetchSearchedVideos = (query) => async (dispatch, getState) => {
  //Starts fetching
  dispatch({ type: types.API_CALL_SEARCH_REQUEST });
  try {
    const response = await youtubeAPI.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 30,
        type: 'video',
        key: KEY_YOUTUBE,
        q: query,
      },
    });

    const { library } = getState();
    let isInLibrary;
    let currentId;

    // We take just all the useful data from youtube API putting it into itemsData
    const itemsData = response.data.items.map((item) => {
      currentId = item.id.videoId;

      //Checks if fetched video item is already in the library
      isInLibrary = isVideoInLibrary(library.libraryVideos, currentId);

      return {
        id: currentId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        isInLibrary,
      };
    });

    // Dispatching succes with a formed video array
    dispatch({
      type: types.API_CALL_SEARCH_SUCCESS,
      payload: itemsData,
    });
  } catch (error) {
    // Dispatching an error if it exists
    dispatch({
      type: types.API_CALL_SEARCH_FAILURE,
      payload: error,
    });
  }
};

// Action creater to fetch video to the library
const fetchVideosInLibrary = () => async (dispatch) => {
  //Starts fetching
  dispatch({ type: types.API_CALL_LIB_REQUEST });

  try {
    const response = await libraryAPI.get('/latest');

    //Dispatching videos from the server library
    dispatch({
      type: types.API_CALL_LIB_SUCCESS,
      payload: response.data.library,
    });
  } catch (error) {
    // Dispatching an error if it exists
    dispatch({
      type: types.API_CALL_LIB_FAILURE,
      payload: error,
    });
  }
};

// Action creater to add video to the library
export const addVideoToLibrary = (libraryProps) => async (
  dispatch,
  getState
) => {
  // Starts putting
  dispatch({
    type: types.API_ADD_TO_LIB_REQUEST,
  });
  try {
    const { library } = getState();
    const response = await libraryAPI.put('/', {
      library: [...library.libraryVideos, libraryProps],
    });

    // Dispatching an updated library to the store after PUT request
    dispatch({
      type: types.API_ADD_TO_LIB_SUCCESS,
      payload: response.data.data.library,
    });
  } catch (error) {
    // Dispatching an error if it exists
    dispatch({
      type: types.API_ADD_TO_LIB_FAILURE,
      payload: error,
    });
  }
};

// Starting action creater to make everything in order
export const fetchStartVideos = (query) => async (dispatch, getState) => {
  await dispatch(fetchVideosInLibrary());
  dispatch(fetchSearchedVideos(query));
};

// Action creater to delete a video from the library
export const deleteVideo = (id) => async (dispatch, getState) => {
  // Preparing the request
  dispatch({
    type: types.API_DELETE_VIDEO_REQUEST,
  });

  const { youtube, library } = getState();

  // Forming a new library without a deleted video
  const newLibrary = library.libraryVideos.filter((video) => video.id !== id);

  try {
    // Putting the new library to the server
    await libraryAPI.put('/', {
      library: [...newLibrary],
    });

    // Dispatching the new library to the store
    dispatch({
      type: types.API_DELETE_VIDEO_SUCCESS,
      payload: id,
    });
  } catch (error) {
    // Dispatching an error if it exists
    dispatch({
      type: types.API_DELETE_VIDEO_FAILURE,
      payload: error,
    });
  }

  // Forming an array of library video IDs
  const listLibraryIDs = library.libraryVideos.map((video) => video.id);

  // Update a searched video "isInLibrary" status
  const itemsData = youtube.videos.map((video) => {
    if (video.id === id) {
      video.isInLibrary = false;
    } else if (listLibraryIDs.includes(video.id)) {
      video.isInLibrary = true;
    }
    return video;
  });

  // Updating videos from youtube
  dispatch({ type: types.API_CALL_SEARCH_REQUEST });
  dispatch({
    type: types.API_CALL_SEARCH_SUCCESS,
    payload: itemsData,
  });
};

// Checking if the current video is already in library
function isVideoInLibrary(libraryVideos, videoId) {
  const inLibrary = libraryVideos.findIndex(
    (libItem) => libItem.id === videoId
  );
  return inLibrary !== -1;
}
