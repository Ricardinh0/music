import { connect } from 'react-redux';
import { getMetronome } from '../reducers/metronome';
import { getAudioMaster } from '../reducers/audioMaster';
import { getKeys } from '../reducers/keys';
import { getSoundBank } from '../reducers/soundBank';
import Metronome from '../components/Metronome/Metronome';

const mapStateToProps = (state) => {
  const keys = getKeys(state).keys.filter(key => key !== undefined && key.active);
  return {
    ...getAudioMaster(state),
    ...getMetronome(state),
    ...getSoundBank(state),
    keys
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
