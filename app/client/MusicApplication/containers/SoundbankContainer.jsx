import { connect } from 'react-redux';
import {
  soundbankCancel,
  soundbankLoadFile
} from '../actions/actionCreators';
import { getAudioMaster } from '../reducers/audioMaster';
import { getSoundBank } from '../reducers/soundBank';
import SoundBank from '../components/SoundBank/SoundBank';


const mapStateToProps = (state) => {
  return {
    ...getAudioMaster(state),
    ...getSoundBank(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSoundbankCancel: data => dispatch(soundbankCancel(data)),
    handleSoundbankLoadFile: data => dispatch(soundbankLoadFile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBank);
