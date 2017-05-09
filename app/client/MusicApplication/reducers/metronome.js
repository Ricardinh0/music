import * as types from '../constants/actionTypes';

export const getMetronome = state => ({ metronome: state.metronome });

const metronome = (state = {
  isPlaying: false,
  bpm: 100
}, action) => {
  switch (action.type) {
    case types.METRONOME_STOP:
      return {
        ...state,
        isPlaying: false
      };
    case types.METRONOME_PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case types.METRONOME_BPM_UPDATE:
      return {
        ...state,
        bpm: action.data.bpm
      };
    default:
      return state;
  }
};

export default metronome;
