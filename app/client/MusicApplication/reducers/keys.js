import * as types from '../constants/actionTypes';

export const getKeys = state => ({ keys: state.keys });

const toggleActivity = (state, action) => {
  const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
  return [
    ...state.slice(0, index),
    ...[state.map((obj, i) => {
      if (i === index) {
        return {
          ...obj,
          active: !obj.active
        };
      }
      return obj;
    })[index]],
    ...state.slice(index + 1)
  ];
};

const keys = (state = {}, action) => {
  switch (action.type) {
    case types.MUSIC_APP_KEYDOWN: {
      return state;
    }
    case types.MUSIC_APP_KEYUP: {
      return state;
    }
    case types.MUSIC_APP_KEY_ACTIVATE:
      return toggleActivity(state, action);
    case types.MUSIC_APP_KEY_DEACTIVATE:
      return toggleActivity(state, action);
    default:
      return state;
  }
};

export default keys;
