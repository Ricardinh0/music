import { connect } from 'react-redux';
import { getUI } from '../reducers/ui';
import MusicApplication from '../components/MusicApplication/MusicApplication';

const mapStateToProps = (state) => {
  return {
    ...getUI(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({});
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicApplication);