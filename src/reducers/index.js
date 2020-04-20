import { combineReducers } from 'redux';
import youtube from './youtube';
import library from './library';

const allReducers = combineReducers({
  youtube,
  library,
});

export default allReducers;
