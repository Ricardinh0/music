import React, { Component } from 'react';
import Mixer from '../Mixer/Mixer';
import Gain from '../Gain/Gain';
import Pan from '../Pan/Pan';
import FilterStack from '../FilterStack/FilterStack';

class Channel extends Component {

  constructor(props) {
    super(props);
    const { master, ctx, channelOutput } = props;
    channelOutput.connect(master);
    this.state = {
      nodes: {
        gain: ctx.createGain(),
        pan: ctx.createStereoPanner()
      }
    }
  }

  componentDidMount() {
    const { channelOutput, channelInput } = this.props;
    const { nodes: { gain, pan } } = this.state;
    pan.connect(channelOutput);
    gain.connect(pan);
    channelInput.connect(gain);
  }

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
    const { handleLevelUpdate, keyCode } = this.props;
    handleLevelUpdate({
      keyCode,
      name,
      value
    });
  }

  handleFilterChange = e => {
    const { target: { name, value, id } } = e;
    const { handleFilterUpdate, keyCode } = this.props;
    handleFilterUpdate({
      keyCode,
      name,
      value,
      id
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
      handleFilterDelete,
      handleStepChange,
      handleLevelChange,
      handleFilterChange,
      handleStepKeyPress
    } = this;

    const {
      nodes
    } = this.state;

    const {
      steps,
      keyCode,
      ctx,
      gain,
      bass,
      mid,
      tre,
      pan,
      filterList,
      channelInput,
      channelOutput,
    } = this.props;

    return (
      <div>
        <span>{keyCode}</span>

        <Gain value={gain} onChange={handleLevelChange} node={nodes.gain} />
        <Pan value={pan} onChange={handleLevelChange} node={nodes.pan} />

        <FilterStack
          ctx={ctx}
          input={nodes.pan}
          output={channelOutput}
          filterList={filterList}
          handleFilterChange={handleFilterChange}
        />

        <div>{steps.map((step, i) =>
          <input type="checkbox" key={i} name={i} checked={step} onChange={handleStepChange} />
        )}</div>
        
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }
};

export default Channel;
