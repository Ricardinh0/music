import * as types from '../constants/actionTypes';

export const getKeys = state => ({ keys: state.keys });
export const getActiveKeys = state => ({
  keys: state.keys.filter(key => key !== undefined && key.active)
});

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
    case types.MUSIC_APP_KEY_ADD_BUFFER: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      const {
        data: {
          buffer,
          ctx
        }
      } = action;
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              buffer,
              channelInput: ctx.createGain(),
              channelOutput: ctx.createGain()
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    case types.MUSIC_APP_KEY_STEP_UPDATE: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              steps: obj.steps.map((step, j) => (
                j === action.data.index ? action.data.checked : step
              ))
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    case types.MUSIC_APP_KEY_LEVEL_UPDATE: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              [action.data.name]: action.data.value
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    case types.MUSIC_APP_KEY_FILTER_UPDATE: {
      const index = state.findIndex(obj => obj.keyCode === action.data.keyCode);
      const id = action.data.id.split('_');
      return [
        ...state.slice(0, index),
        ...[state.map((obj, i) => {
          if (i === index) {
            return {
              ...obj,
              filterList: [
                ...obj.filterList.splice(0, id[0]),
                ...[{
                  ...obj.filterList[id[0]],
                  [id[1]]: parseFloat(action.data.value)
                }],
                ...obj.filterList.splice(id[0] + 1)
              ]
            };
          }
          return obj;
        })[index]],
        ...state.slice(index + 1)
      ];
    }
    default:
      return state;
  }
};

export default keys;
