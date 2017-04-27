import * as types from '../constants/actionTypes';

export const getKeys = state => ({
  keys: state.keys
});

const keys = (state = {
  active: ''
}, action) => {
  switch (action.type) {
    case types.MUSIC_APP_KEYPRESS:
      return state;
    case types.MUSIC_APP_KEYPRESSED:
      return state;
    case types.MUSIC_APP_KEYDEPRESSED:
      return state;
    case types.MUSIC_APP_KEYUP:
      return {
        ...state,
        active: action.data.key
      };
    case types.MUSIC_APP_KEY_ACTIVATE:
      return state;
    case types.MUSIC_APP_KEY_DEACTIVATE:
      return state;
    default:
      return state;
  }
};

export default keys;
