import React, { Component } from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';

const ctx = new AudioContext();
const master = ctx.createGain();
master.connect(ctx.destination);

class MusicApplication extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { handleKeyPress } = this;
    const { handleKeyUp } = this.props;
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keypress', handleKeyPress);
  }

  componentWillUnmount() {
    const { handleKeyPress } = this;
    const { handleKeyUp } = this.props;
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('keypress', handleKeyPress);
  }

  handleKeyPress = e => {};

  render() {
    const {
      ui,
      keys
    } = this.props;

    return (
      <div>
        <div>{ui}</div>
        <div>{keys.active}</div>
        <Qwerty />
      </div>
    );
  }
};

export default MusicApplication;