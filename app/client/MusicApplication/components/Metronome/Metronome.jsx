import React, { Component } from 'react';
import play from '../../utils/utils.play';

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
    const { soundBank: { visible: soundBankVisible } } = this.props;
    if (!soundBankVisible) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        Metronome
      </div>
    );
  }
};

export default Metronome;
