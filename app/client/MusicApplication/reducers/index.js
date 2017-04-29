import { combineReducers } from 'redux';
import ui from './ui';
import keys from './keys';
import soundBank from './soundBank';

const rootReducer = combineReducers({
  ui,
  keys,
  soundBank
});

export default rootReducer;
