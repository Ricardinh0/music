import React, { Component } from 'react';
import play from '../../utils/utils.play';
import requestAnimationFrame from '../../utils/utils.requestAnimationFrame';

class Metronome extends Component {

  componentWillMount() {
    const { handleKeyUp } = this;
    document.addEventListener('keyup', handleKeyUp);
  }

  componentWillUnmount() {
    const { handleKeyUp } = this;
    document.removeEventListener('keyup', handleKeyUp);
  }

  handleKeyUp = e => {
    const { 
      isPlaying, 
      soundBank: { visible: soundBankVisible },
      handleStop,
      handlePlay
    } = this.props;
    if (!soundBankVisible && e.keyCode === 32) {
      isPlaying ? handleStop() : handlePlay();
    }
  }

  render() {
    const {
      isPlaying,
    } = this.props;
    return (
      <div>
        <span>{`${isPlaying}`}</span>
      </div>
    );
  }
};

export default Metronome;
