import { takeLatest, call, put } from "redux-saga/effects";
import { fetchSearchVideos } from './fetches';
import * as types from '../constants/actions';


export function* watcherSagaSearchVideos() {
  yield takeLatest(types.API_CALL_SEARCH_REQUEST, workerSagaSearchVideos);
}




function* workerSagaSearchVideos(action) {
  try {
    const response = yield call(fetchSearchVideos, action.query);
    const videos = response.data;
      yield put({ type: types.API_CALL_SEARCH_SUCCESS, videos });

  } catch (error) {
     yield put({ type: types.API_CALL_SEARCH_FAILURE, error });
  }
}