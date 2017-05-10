import React, { Component } from 'react';
import ChannelContainer from '../../containers/ChannelContainer';

class Track extends Component {

  render() {
    const {
      keys
    } = this.props;

    return (
      <div>
        <h1>Track</h1>
        {keys.filter(key => key !== undefined && key.active).map((key, i) =>
          <ChannelContainer
            key={i}
            {...key}
          />
        )}
      </div>
    );
  }
};

export default Track;
