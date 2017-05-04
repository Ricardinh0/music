import { connect } from 'react-redux';
import {
  soundbankCancel,
  soundbankSave,
  soundbankShow
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
    handleSoundbankSave: data => dispatch(soundbankSave(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBank);
