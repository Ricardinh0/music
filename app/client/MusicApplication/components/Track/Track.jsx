import React, { Component } from 'react';

class Track extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleDelete = (e) => {
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
      keys
    } = this.props;

    return (
      <div>
        <h1>Track</h1>
        {keys.map((key, i) =>
          <div key={i}>
            <span>{key.keyCode}</span>
            <button onClick={handleDelete} data-key-code={key.keyCode}>Delete</button>
          </div>
        )}
      </div>
    );
  }
};

export default Track;
