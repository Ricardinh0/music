import * as types from '../constants/actionTypes';

export const getKeys = state => ({ keys: state.keys });

const keys = (state = {
  keyCode: 0,
  active: false,
}, action) => {
  switch (action.type) {
    case types.MUSIC_APP_KEYDOWN: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              active: true
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    case types.MUSIC_APP_KEYUP: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              active: false
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    case types.MUSIC_APP_KEY_ACTIVATE:
      return state;
    case types.MUSIC_APP_KEY_DEACTIVATE:
      return state;
    default:
      return state;
  }
};

export default keys;
