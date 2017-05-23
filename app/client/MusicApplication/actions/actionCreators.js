import * as types from '../constants/actionTypes';
import loadFileAndDecode from '../../shared/services/loadFileAndDecode';

export const keyDown = data => ({
  type: types.MUSIC_APP_KEYDOWN,
  data
});

export const keyUp = data => ({
  type: types.MUSIC_APP_KEYUP,
  data
});

export const keyActivate = data => ({
  type: types.MUSIC_APP_KEY_ACTIVATE,
  data
});

export const keyDeactivate = data => ({
  type: types.MUSIC_APP_KEY_DEACTIVATE,
  data
});

export const keyUpdateStep = data => ({
  type: types.MUSIC_APP_KEY_STEP_UPDATE,
  data
});

export const keyUpdateLevel = data => ({
  type: types.MUSIC_APP_KEY_LEVEL_UPDATE,
  data
});

export const keyUpdateFilter = data => ({
  type: types.MUSIC_APP_KEY_FILTER_UPDATE,
  data
});

export const metronomeStop = () => ({
  type: types.METRONOME_STOP
});

export const metronomePlay = () => ({
  type: types.METRONOME_PLAY
});

export const metronomeUpdateBPM = data => ({
  type: types.METRONOME_BPM_UPDATE,
  data
});

export const soundbankLoadFile = data => (
  (dispatch) => {
    loadFileAndDecode({
      src: data.src
    }).then((arrayBuffer) => {
      data.ctx.decodeAudioData(
        arrayBuffer,
        (buffer) => {
          dispatch({
            type: types.MUSIC_APP_KEY_ADD_BUFFER,
            data: {
              buffer,
              keyCode: data.keyCode,
              ctx: data.ctx
            }
          });
          dispatch({
            type: types.SOUNDBANK_CLOSE,
          });
        }
      );
    });
  }
);

export const soundbankShow = data => (
  (dispatch) => {
    dispatch(keyActivate(data));
    dispatch(metronomeStop());
    dispatch({
      type: types.SOUNDBANK_SHOW,
      data
    });
  }
);

export const soundbankCancel = data => (
  (dispatch) => {
    dispatch(keyDeactivate(data));
    dispatch({
      type: types.SOUNDBANK_CANCEL
    });
  }
);
