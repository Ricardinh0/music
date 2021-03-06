import React, { PureComponent } from 'react';

class Gain extends PureComponent {

  constructor(props) {
    super(props);
    const { node } = props;
    this.state = {
      node
    };
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.state;
    const { value } = nextProps;
    node.gain.value = value;
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
