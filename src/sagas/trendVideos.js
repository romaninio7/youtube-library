import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchTrendVideos } from './fetches';
import * as types from '../constants/actions';

export function* watcherSagaTrendVideos() {
	yield takeLatest(types.API_CALL_REQUEST, workerSagaTrendVideos);
}

function* workerSagaTrendVideos() {
	try {
		const response = yield call(fetchTrendVideos);
		const videos = response.data;
		yield put({ type: types.API_CALL_SUCCESS, videos });
	} catch (error) {
		yield put({ type: types.API_CALL_FAILURE, error });
	}
}
