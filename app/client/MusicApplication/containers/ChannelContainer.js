import { connect } from 'react-redux';
import {
  keyDeactivate,
  keyUpdateStep,
  keyUpdateLevel,
  keyUpdateFilter
} from '../actions/actionCreators';
import { getAudioMaster } from '../reducers/audioMaster';
import Channel from '../components/Channel/Channel';

const mapStateToProps = (state, props) => ({
  ...props,
  ...{ ...getAudioMaster(state) }.audioMaster
});

const mapDispatchToProps = dispatch => ({
  handleStepUpdate: data => dispatch(keyUpdateStep(data)),
  handleKeyDeactivate: e => dispatch(keyDeactivate(e)),
  handleLevelUpdate: data => dispatch(keyUpdateLevel(data)),
  handleFilterUpdate: data => dispatch(keyUpdateFilter(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
