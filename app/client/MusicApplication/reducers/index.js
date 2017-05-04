import { combineReducers } from 'redux';
import ui from './ui';
import keys from './keys';
import soundBank from './soundBank';
import audioMaster from './audioMaster';

const rootReducer = combineReducers({
  audioMaster,
  keys,
  soundBank,
  ui
});

export default rootReducer;
