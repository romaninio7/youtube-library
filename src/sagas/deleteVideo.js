import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchDeleteVideo, fetchLibVideos } from './fetches';
import * as types from '../constants/actions';

export function* watcherSagaDeleteVideo() {
	yield takeEvery(types.API_DELETE_VIDEO_REQUEST, workerSagaDeleteVideo);
}

function* workerSagaDeleteVideo(action) {
	try {
		const responseDelete = yield call(fetchDeleteVideo, action.deleteId);
		console.log(responseDelete);
		const responseGet = yield call(fetchLibVideos);
		const libVideos = responseGet.data;
		yield put({ type: types.API_DELETE_VIDEO_SUCCESS, libVideos });
	} catch (error) {
		yield put({ type: types.API_DELETE_VIDEO_FAILURE, error });
	}
}
