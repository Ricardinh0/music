import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import keyMap from './utils/utils.keyMap';
import MusicApplicationContainer from './containers/MusicApplicationContainer';

const MusicApplication = (props) => {
  const initialState = {
    ...props,
    keys: keyMap
  };

  return (
    <Provider store={configureStore(initialState)}>
      <MusicApplicationContainer />
    </Provider>
  );
};

export default MusicApplication;
