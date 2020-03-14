import { all } from 'redux-saga/effects';
import { watcherSagaTrendVideos } from './trendVideos';
import { watcherSagaLibVideos } from './libVideos';
import { watcherSagaSearchVideos } from './searchVideos';
import { watcherSagaAddToLib } from './addToLib';
import { watcherSagaDeleteVideo } from './deleteVideo';

export default function* rootSaga() {
  yield all([
    watcherSagaTrendVideos(),
    watcherSagaLibVideos(),
    watcherSagaSearchVideos(),
    watcherSagaAddToLib(),
    watcherSagaDeleteVideo()
  ])
}