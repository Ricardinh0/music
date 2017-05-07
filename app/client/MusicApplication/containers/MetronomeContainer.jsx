import { connect } from 'react-redux';
import {
  metronomeStop,
  metronomePlay
} from '../actions/actionCreators';
import { getMetronome } from '../reducers/metronome';
import { getAudioMaster } from '../reducers/audioMaster';
import { getActiveKeys } from '../reducers/keys';
import { getSoundBank } from '../reducers/soundBank';
import Metronome from '../components/Metronome/Metronome';

const mapStateToProps = (state) => {
  return {
    ...getAudioMaster(state),
    ...{ ...getMetronome(state) }.metronome,
    ...getSoundBank(state),
    ...getActiveKeys(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStop: () => dispatch(metronomeStop()),
    handlePlay: () => dispatch(metronomePlay())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
