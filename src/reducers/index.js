import { combineReducers } from 'redux';
import videos from './videos';
import libVideos from './libVideos';

const allReducers = combineReducers({
    videos,
    libVideos
})

export default allReducers;
