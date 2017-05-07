import { connect } from 'react-redux';
import {
  keyDeactivate,
  keyUpdateStep
} from '../actions/actionCreators';
import { getTrack } from '../reducers/track';
import { getActiveKeys } from '../reducers/keys';
import Track from '../components/Track/Track';

const mapStateToProps = (state) => {
  return {
    ...getTrack(state),
    ...getActiveKeys(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStepUpdate: data => dispatch(keyUpdateStep(data)),
    handleKeyDeactivate: e => dispatch(keyDeactivate(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
