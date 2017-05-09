import React, { Component } from 'react';
import Gain from '../Gain/Gain';

class Channel extends Component {

  shouldComponentUpdate(nextProps) {
    //  BUG WATCH
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  handleChange = e => {
    const { target } = e;
    const { handleStepUpdate, keyCode } = this.props;
    handleStepUpdate({
     checked: target.checked ? 1 : 0,
     index: parseInt(target.name),
     keyCode
    });
  };

  handleKeyPress = e => false;

  render() {
    const {
      handleChange,
      handleKeyPress
    } = this;

    const {
      steps,
      keyCode,
      handleDelete
    } = this.props;

    return (
      <div>
        <span>{keyCode}</span>
        <Gain />
        <div>{steps.map((step, i) =>
          <input type="checkbox" key={i} name={i} checked={step} onChange={handleChange} onKeyPress={handleKeyPress} />
        )}</div>
        <button onClick={handleDelete} data-key-code={keyCode}>Delete</button>
      </div>
    )
  }
};

export default Channel;
