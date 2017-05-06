import { connect } from 'react-redux';
import {
  keyDeactivate,
  updateKeyStep
} from '../actions/actionCreators';
import { getTrack } from '../reducers/track';
import { getKeys } from '../reducers/keys';
import Track from '../components/Track/Track';

const mapStateToProps = (state) => {
  const keys = getKeys(state).keys.filter(key => key !== undefined && key.active);
  return {
    ...getTrack(state),
    keys
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStepUpdate: data => dispatch(updateKeyStep(data)),
    handleKeyDeactivate: e => dispatch(keyDeactivate(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
