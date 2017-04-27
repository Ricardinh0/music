import * as types from '../constants/actionTypes';

export const keyDown = (data) => {
  return {
    type: types.MUSIC_APP_KEYDOWN,
    data: data
  };
};

export const keyPressed = () => {
  return {
    type: types.MUSIC_APP_KEYPRESSED
  };
};

export const keyDepressed = () => {
  return {
    type: types.MUSIC_APP_DEKEYPRESSED
  };
};

export const keyUp = (data) => {
  return {
    type: types.MUSIC_APP_KEYUP,
    data: data
  };
};

export const keyActivate = () => {
  return {
    type: types.MUSIC_APP_KEY_ACTIVATE,
    data: data
  }
};

export const keyDeactivate = (data) => {
  return {
    type: types.MUSIC_APP_KEY_DEACTIVATE,
    data: data
  }
};
