import * as types from '../constants/actionTypes';

export const getAudioMaster = state => ({ audioMaster: state.audioMaster });

const audioMaster = (state = {}, action) => {
  return state;
};

export default audioMaster;
