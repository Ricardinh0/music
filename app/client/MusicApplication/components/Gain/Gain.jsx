import React, { Component } from 'react';

class Gain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
    // this.inputNode = ctx.createGain(); // On mount
    // this.inputNode.gain.value = parseFloat(this.model.level()); // On new props
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const {
      handleChange
    } = this;
    const {
      value
    } = this.state
    return (
      <div>
        <label>Gain</label>
        <input type="range" min="0" max="1" step="0.01" defaultValue={value} onChange={handleChange} />
        <output>{value}</output>
      </div>
    )
  }
};

export default Gain;
