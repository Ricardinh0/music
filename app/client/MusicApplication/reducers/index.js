import { combineReducers } from 'redux';
import audioMaster from './audioMaster';
import keys from './keys';
import soundBank from './soundBank';
import track from './track';
import ui from './ui';

const rootReducer = combineReducers({
  audioMaster,
  keys,
  soundBank,
  track,
  ui
});

export default rootReducer;
