import axios from 'axios';
import * as urls from '../constants/api';

export function fetchAddToLib(id) {
	return axios({
		method: 'put',
		url: urls.API_LIB_VIDEO_URL + id,
	});
}
export function fetchLibVideos() {
	return axios({
		method: 'get',
		url: urls.API_LIB_VIDEO_URL,
	});
}

export function fetchDeleteVideo(id) {
	return axios({
		method: 'delete',
		url: urls.API_LIB_VIDEO_URL + id,
	});
}

export function fetchSearchVideos(query) {
	return axios({
		method: 'get',
		url: urls.API_SEARCH_VIDEO + query,
	});
}

export function fetchTrendVideos() {
	return axios({
		method: 'get',
		url: urls.API_GET_TREND_VIDEO_URL,
	});
}
