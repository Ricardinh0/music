import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import MusicApplicationContainer from './containers/MusicApplicationContainer';

const MusicApplication = (props) => {
  return (
    <Provider store={configureStore(props)}>
      <MusicApplicationContainer />
    </Provider>
  );
};

export default MusicApplication;
