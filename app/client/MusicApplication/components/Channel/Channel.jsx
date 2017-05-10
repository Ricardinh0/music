import React, { Component } from 'react';
import Mixer from '../Mixer/Mixer';
import Gain from '../Gain/Gain';

class Channel extends Component {

  shouldComponentUpdate(nextProps) {
    //  BUG WATCH
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  handleStepChange = e => {
    const { target } = e;
    const { handleStepUpdate, keyCode } = this.props;
    handleStepUpdate({
     checked: target.checked ? 1 : 0,
     index: parseInt(target.name),
     keyCode
    });
  };

  handleLevelChange = e => {
    const { target: { name, value } } = e;
    const { handleLevelUpdate, keyCode, ctx } = this.props;
    handleLevelUpdate({
      keyCode,
      name,
      value
    });
  }

  handleDelete = e => {
    const { target } = e;
    const { handleKeyDeactivate, keyCode } = this.props;
    handleKeyDeactivate({
      keyCode
    });
  }


  render() {
    const {
      handleDelete,
      handleStepChange,
      handleLevelChange,
      handleStepKeyPress
    } = this;

    const {
      steps,
      keyCode,
      ctx,
      gain,
      bass,
      mid,
      tre,
      pan
    } = this.props;

    return (
      <div>
        <span>{keyCode}</span>

        <Mixer>
          <Gain ctx={ctx} value={gain} onChange={handleLevelChange} />
        </Mixer>

        <div>{steps.map((step, i) =>
          <input type="checkbox" key={i} name={i} checked={step} onChange={handleStepChange} />
        )}</div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }
};

export default Channel;
