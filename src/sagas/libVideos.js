import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchLibVideos } from './fetches';
import * as types from '../constants/actions';

export function* watcherSagaLibVideos() {
	yield takeLatest(types.API_CALL_LIB_REQUEST, workerSagaLibVideos);
}

function* workerSagaLibVideos() {
	try {
		const response = yield call(fetchLibVideos);
		const libVideos = response.data;
		yield put({ type: types.API_CALL_LIB_SUCCESS, libVideos });
	} catch (error) {
		yield put({ type: types.API_CALL_LIB_FAILURE, error });
	}
}
