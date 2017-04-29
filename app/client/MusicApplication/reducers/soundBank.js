import * as types from '../constants/actionTypes';

export const getSoundBank = state => ({ soundBank: state.soundBank });

const soundBank = (state = {
  visible: false
}, action) => {
  switch (action.type) {
    case types.SOUNDBANK_SHOW:
      return {
        ...state,
        visible: !state.visible
      };
    default:
      return state;
  }
};

export default soundBank;
