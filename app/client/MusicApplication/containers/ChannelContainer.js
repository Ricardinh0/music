import { connect } from 'react-redux';
import {
  keyDeactivate,
  keyUpdateStep,
  keyUpdateLevel
} from '../actions/actionCreators';
import { getMetronome } from '../reducers/metronome';
import { getAudioMaster } from '../reducers/audioMaster';
import Channel from '../components/Channel/Channel';

const mapStateToProps = (state, props) => ({
  ...props,
  ...{ ...getAudioMaster(state) }.audioMaster,
  ...{ ...getMetronome(state) }.metronome
});

const mapDispatchToProps = dispatch => ({
  handleStepUpdate: data => dispatch(keyUpdateStep(data)),
  handleKeyDeactivate: e => dispatch(keyDeactivate(e)),
  handleLevelUpdate: data => dispatch(keyUpdateLevel(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
