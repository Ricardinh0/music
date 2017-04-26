import { connect } from 'react-redux';
import {
  keyPress,
  keyPressed,
  keyDepressed,
  keyUp
} from '../actions/actionCreators';
import { getUI } from '../reducers/ui';
import { getKeys } from '../reducers/keys';
import MusicApplication from '../components/MusicApplication/MusicApplication';

const mapStateToProps = (state) => {
  return {
    ...getUI(state),
    ...getKeys(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleKeyUp: () => dispatch(keyUp())
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicApplication);