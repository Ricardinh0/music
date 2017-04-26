import * as types from '../constants/actionTypes';

export const keyPress = () => {
  return {
    type: types.MUSIC_APP_KEYPRESS
  }
};

export const keyPressed = () => {
  return {
    type: types.MUSIC_APP_KEYPRESSED
  }
};

export const keyDepressed = () => {
  return {
    type: types.MUSIC_APP_DEKEYPRESSED
  }
};

export const keyUp = () => {
  console.log(types);
  return {
    type: types.MUSIC_APP_KEYUP
  }
};
