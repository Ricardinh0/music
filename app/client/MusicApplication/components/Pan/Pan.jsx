import React, { PureComponent } from 'react';

class Pan extends PureComponent {

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
    node.pan.value = value;
  }

  render() {
    const {
      value,
      onChange
    } = this.props;
    return (
      <div>
        <label>Pan</label>
        <input name="pan" type="range" min="-1" max="1" step="0.01" defaultValue={value} onChange={onChange} />
        <output>{value}</output>
      </div>
    )
  }
};

export default Pan;
