import React from 'react';
import ChannelContainer from '../../containers/ChannelContainer';
import MetronomeContainer from '../../containers/MetronomeContainer';

const Track = ({
  keys
}) => (
  <div>
    <h1>Track</h1>
    <MetronomeContainer />
    {keys.filter(key => key !== undefined && key.active && key.buffer).map((key, i) =>
      <ChannelContainer
        key={i}
        {...key}
      />
    )}
  </div>
);

export default Track;
