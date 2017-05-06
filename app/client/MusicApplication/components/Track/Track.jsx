import React, { Component } from 'react';
import Channel from '../Channel/Channel';

class Track extends Component {

  handleDelete = e => {
    const { target } = e;
    const { handleKeyDeactivate } = this.props;
    const keyCode = parseInt(target.getAttribute('data-key-code'));
    handleKeyDeactivate({
      keyCode: keyCode
    });
  }

  render() {
    const {
      handleDelete
    } = this;

    const {
      keys,
      handleStepUpdate
    } = this.props;

    return (
      <div>
        <h1>Track</h1>
        {keys.map((data, i) =>
          <Channel
            key={i}
            {...data}
            handleDelete={handleDelete}
            handleStepUpdate={handleStepUpdate}
          />
        )}
      </div>
    );
  }
};

export default Track;
