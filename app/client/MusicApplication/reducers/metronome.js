import * as types from '../constants/actionTypes';

export const getMetronome = state => ({ metronome: state.metronome });

const metronome = (state = {
  isPlaying: false
}, action) => {
  switch (action.type) {
    case types.METRONOME_STOP:
      return {
        isPlaying: false
      };
    case types.METRONOME_PLAY:
      return {
        isPlaying: true
      };
    default:
      return state;
  }
};

export default metronome;
