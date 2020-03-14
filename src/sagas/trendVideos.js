import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as urls from '../constants/api';
import * as types from '../constants/actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaTrendVideos() {
  yield takeLatest(types.API_CALL_REQUEST, workerSagaTrendVideos);
}

// function that makes the api request and returns a Promise for response
function fetchTrendVideos() {
  return axios({
    method: "get",
    url: urls.API_GET_TREND_VIDEO_URL
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSagaTrendVideos() {
  try {
    const response = yield call(fetchTrendVideos);
    const videos = response.data;
      yield put({ type: types.API_CALL_SUCCESS, videos });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.API_CALL_FAILURE, error });
  }
}