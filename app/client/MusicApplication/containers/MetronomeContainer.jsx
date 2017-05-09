import { connect } from 'react-redux';
import {
  metronomeStop,
  metronomePlay,
  metronomeUpdateBPM
} from '../actions/actionCreators';
import { getMetronome } from '../reducers/metronome';
import { getAudioMaster } from '../reducers/audioMaster';
import { getKeys } from '../reducers/keys';
import { getSoundBank } from '../reducers/soundBank';
import Metronome from '../components/Metronome/Metronome';

const mapStateToProps = state => ({
  ...getAudioMaster(state),
  ...{ ...getMetronome(state) }.metronome,
  ...getSoundBank(state),
  ...getKeys(state)
});

const mapDispatchToProps = dispatch => ({
  handleStop: () => dispatch(metronomeStop()),
  handlePlay: () => dispatch(metronomePlay()),
  handleUpdateBPM: data => dispatch(metronomeUpdateBPM(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
