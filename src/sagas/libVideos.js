import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as urls from '../constants/api';
import * as types from '../constants/actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaLibVideos() {
  yield takeLatest(types.API_CALL_LIB_REQUEST, workerSagaLibVideos);
}

// function that makes the api request and returns a Promise for response
function fetchLibVideos() {
  return axios({
    method: "get",
    url: urls.API_LIB_VIDEO_URL
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSagaLibVideos() {
  try {
    const response = yield call(fetchLibVideos);
    const libVideos = response.data;
      yield put({ type: types.API_CALL_LIB_SUCCESS, libVideos });
    // dispatch a success action to the store with the new dog
  
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.API_CALL_LIB_FAILURE, error });
  }
}