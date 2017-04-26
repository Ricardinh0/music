import React, { Component } from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';

class MusicApplication extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { handleKeyUppp, handleKeyPress } = this;
    document.addEventListener('keyup', handleKeyUppp);
    document.addEventListener('keypress', handleKeyPress);
  }

  componentWillUnmount() {
    const { handleKeyUppp, handleKeyPress } = this;
    document.removeEventListener('keyup', handleKeyUppp);
    document.removeEventListener('keypress', handleKeyPress);
  }

   handleKeyUppp = e => {
    const {
      handleKeyUp
    } = this.props;

    handleKeyUp();
  };

   handleKeyPress = e => {
    console.log(e);
  };

  render() {
    
    const {
      ui
    } = this.props;

    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.connect(ctx.destination);

    return (
      <div>
        <div>{ui}</div>
        <Qwerty />
      </div>
    );
  }
};

export default MusicApplication;