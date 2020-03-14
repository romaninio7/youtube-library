import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as urls from '../constants/api';
import * as types from '../constants/actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaAddToLib() {
  yield takeLatest(types.API_ADD_TO_LIB_REQUEST, workerSagaAddToLib);
}

// function that makes the api request and returns a Promise for response
function fetchAddToLib(id) {
  return axios({
    method: "put",
    url: urls.API_LIB_VIDEO_URLX + id
  });
}
function fetchLibVideos() {
    return axios({
      method: "get",
      url: urls.API_LIB_VIDEO_URL
    });
  }
// worker saga: makes the api call when watcher saga sees the action
function* workerSagaAddToLib(action) {
  try {
    const response = yield call(fetchAddToLib, action.addId);
    console.log(response);
    const response2 = yield call(fetchLibVideos);
    const libVideos = response2.data;
      yield put({ type: types.API_ADD_TO_LIB_SUCCESS, libVideos });
    //const libVideos = response.data;

     
  
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.API_ADD_TO_LIB_FAILURE, error });
  }
}