import * as types from '../constants/actionTypes';

export const keyDown = (data) => {
  return {
    type: types.MUSIC_APP_KEYDOWN,
    data: data
  };
};

export const keyUp = (data) => {
  return {
    type: types.MUSIC_APP_KEYUP,
    data: data
  };
};

export const keyActivate = (data) => {
  return {
    type: types.MUSIC_APP_KEY_ACTIVATE,
    data: data
  };
};

export const keyDeactivate = (data) => {
  return {
    type: types.MUSIC_APP_KEY_DEACTIVATE,
    data: data
  };
};

export const soundbankSave = (data) => {
  return {
    type: types.SOUNDBANK_SAVE,
    data: data
  };
};

export const soundbankShow = (data) => {
  return (dispatch) => {
    dispatch(keyActivate(data));
    dispatch({
      type: types.SOUNDBANK_SHOW,
      data: data
    });
  };
};

export const soundbankCancel = (data) => {
  return (dispatch) => {
    dispatch(keyDeactivate(data));
    dispatch({
      type: types.SOUNDBANK_CANCEL
    });
  };
};
