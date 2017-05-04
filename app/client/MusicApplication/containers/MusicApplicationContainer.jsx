import { connect } from 'react-redux';
import {
  keyDown,
  keyUp,
  keyActivate,
  keyDeactivate,
  soundbankShow
} from '../actions/actionCreators';
import { getAudioMaster } from '../reducers/audioMaster';
import { getUI } from '../reducers/ui';
import { getKeys } from '../reducers/keys';
import { getSoundBank } from '../reducers/soundBank';
import MusicApplication from '../components/MusicApplication/MusicApplication';

const mapStateToProps = (state) => {
  return {
    ...getAudioMaster(state),
    ...getKeys(state),
    ...getSoundBank(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    handleKeyUp: e => dispatch(keyUp(e)),
    handleKeyDown: e => dispatch(keyDown(e)),
    handleKeyActivate: e => dispatch(keyActivate(e)),
    handleKeyDeactivate: e => dispatch(keyDeactivate(e)),
    handleSoundbankShow: data => dispatch(soundbankShow(data))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicApplication);
