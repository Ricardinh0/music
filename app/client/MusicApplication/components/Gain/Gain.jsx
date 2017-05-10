import React, { PureComponent } from 'react';

class Gain extends PureComponent {

  constructor(props) {
    super(props);
    const { ctx } = props;
    this.state = {
      inputNode: ctx.createGain()
    };
  }

  componentWillMount() {
    const { inputNode } = this.state;
    inputNode.gain.value = 0.5;
  }

  componentWillReceiveProps(nextProps) {
    const { inputNode } = this.state;
    const { value } = nextProps;
    inputNode.gain.value = value;
  }

  render() {
    const {
      value,
      onChange
    } = this.props;
    return (
      <div>
        <label>Gain</label>
        <input name="gain" type="range" min="0" max="1" step="0.01" defaultValue={value} onChange={onChange} />
        <output>{value}</output>
      </div>
    )
  }
};

export default Gain;
