import React, { PureComponent } from 'react';
import requestAnimationFrame from '../../utils/utils.requestAnimationFrame';
import LFO from '../../utils/utils.LFO';

class Phaser extends PureComponent {

  constructor(props) {
    super(props);
    const {
      ctx
    } = props;

    this.allpass = Array.from({length: 8}, (value, i) => {
      let node = ctx.createBiquadFilter();
      node.type = 'allpass';
      node.frequency.value = 1000 * i;
      return node;
    });

    this.LFO = new LFO();
    this.state = {
      isPlaying: false,
      frequency: 0.05,
      phase: 1000
    }
  }

  componentDidMount() {
    const {
      allpass
    } = this;
    const { 
      input,
      output
    } = this.props;
    input.connect(allpass[0]);
    allpass.map((node, i) => node.connect(allpass[i + 1] || output));
    input.connect(output);
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying: nextIsPlaying } = nextProps;
    const { isPlaying } = this.state;
    if (isPlaying !== nextIsPlaying) {
      this.setState({ 
        isPlaying: nextIsPlaying
      }, () => {
        if (!isPlaying) {
          this.tick();
        }
      });
    }
  }

  onChange = (e) => {
    const { target: { name, value }} = e;
    const { LFO } = this;
    this.setState({
      [name]: value
    }, () => {
      name && name === 'frequency' && LFO.set(value)
    });
  }

  tick = () => {
    const { isPlaying, phase } = this.state;
    const { LFO, allpass } = this;
    allpass.map((node, i) => node.frequency.value = ((LFO.get() * 1000) + phase) * (i+1));
    isPlaying && requestAnimationFrame(this.tick)
  }

  render() {
    const {
      onChange
    } = this;
    const {
      frequency,
      phase
    } = this.state;
    return (
      <div>
        <h3>Phaser</h3>
        <div>
          <input
            name="phase"
            type="range"
            step="1"
            min="1000"
            max="1750"
            defaultValue={phase}
            onChange={onChange}
          />
          <output>{phase}</output>
        </div>
        <div>
          <input
            name="frequency"
            type="range"
            step="0.001"
            min="0"
            max="0.1"
            defaultValue={frequency}
            onChange={onChange}
          />
          <output>{frequency}</output>
        </div>
      </div>
    );
  }
}

export default Phaser;
