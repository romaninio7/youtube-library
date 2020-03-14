import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as urls from '../constants/api';
import * as types from '../constants/actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSagaSearchVideos() {
  yield takeLatest(types.API_CALL_SEARCH_REQUEST, workerSagaSearchVideos);
}

// function that makes the api request and returns a Promise for response
function fetchSearchVideos(query) {
  return axios({
    method: "get",
    url: urls.API_SEARCH_VIDEO + query
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSagaSearchVideos(action) {
  try {
    const response = yield call(fetchSearchVideos, action.query);
    const videos = response.data;
      yield put({ type: types.API_CALL_SEARCH_SUCCESS, videos });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.API_CALL_SEARCH_FAILURE, error });
  }
}