import * as types from '../constants/actionTypes';

export const getKeys = state => ({
  keys: state.keys
});

const keys = (state = {

}, action) => {

  debugger;

  switch (action.type) {
    case types.MUSIC_APP_KEYPRESS:
      return state;
    case types.MUSIC_APP_KEYPRESSED:
      return state;
    case types.MUSIC_APP_KEYDEPRESSED:
      return state;
    case types.MUSIC_APP_KEYUP:
      return state;
    default:
      return state;
  }
};

export default keys;
