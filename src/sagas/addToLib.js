import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAddToLib, fetchLibVideos } from './fetches';
import * as types from '../constants/actions';

export function* watcherSagaAddToLib() {
	yield takeEvery(types.API_ADD_TO_LIB_REQUEST, workerSagaAddToLib);
}

function* workerSagaAddToLib(action) {
	try {
		const responseAdd = yield call(fetchAddToLib, action.addId);
		console.log(responseAdd);
		const responseGet = yield call(fetchLibVideos);
		const libVideos = responseGet.data;
		yield put({ type: types.API_ADD_TO_LIB_SUCCESS, libVideos });
	} catch (error) {
		// dispatch a failure action to the store with the error
		yield put({ type: types.API_ADD_TO_LIB_FAILURE, error });
	}
}
