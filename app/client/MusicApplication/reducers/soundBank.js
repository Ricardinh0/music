import * as types from '../constants/actionTypes';

export const getSoundBank = state => ({ soundBank: state.soundBank });

const soundBank = (state = {
  visible: false,
  keyCode: undefined,
  isSaving: false
}, action) => {
  switch (action.type) {
    case types.SOUNDBANK_SHOW:
      return {
        ...state,
        visible: true,
        keyCode: action.data.keyCode
      };
    case types.SOUNDBANK_CANCEL:
      return {
        ...state,
        visible: false,
        keyCode: undefined
      };
    case types.SOUNDBANK_CLOSE:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
};

export default soundBank;
