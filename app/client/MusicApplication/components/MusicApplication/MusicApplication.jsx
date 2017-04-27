import React, { Component } from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';
import SoundBank from '../SoundBank/SoundBank';

const ctx = new AudioContext();
const master = ctx.createGain();
master.connect(ctx.destination);

class MusicApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSoundBank: false,
      currentKeyCode: undefined
    }
  }

  componentWillMount() {
    const { handleKeyUp, handleKeyDown } = this;
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);
  }

  componentWillUnmount() {
    const { handleKeyUp, handleKeyDown } = this;
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('keydown', handleKeyDown);
  }

  keyActive = (keyCode) => {
    const { keys } = this.props;
    return keys.filter(obj => obj.active && obj.keyCode === keyCode).length
  }

  handleKeyUp = (e) => {
    const { keyActive } = this;
    const { showSoundBank } = this.state;
    if (!showSoundBank) {
      if (keyActive(e.keyCode)) {
        console.log('punch');
      }
    }
  };

  handleKeyDown = (e) => {
    const { handleKeyActivate } = this.props;
    const { showSoundBank } = this.state;
    const { keyActive } = this;
    if (!showSoundBank) {
      if (!keyActive(e.keyCode)) {
        handleKeyActivate(e);
        this.setState({
          showSoundBank: true,
          currentKeyCode: e.keyCode
        })
      }
    }
  };

  handleSoundBankCancel = () => {
    const { currentKeyCode } = this.state;
    const { handleKeyDeactivate } = this.props;
    handleKeyDeactivate({ keyCode: currentKeyCode });
    this.setState({ showSoundBank: false });
  }

  handleSoundBankClose = () => {
    this.setState({ 
      showSoundBank: false,
      currentKeyCode: undefined
    });
  }

  render() {

    const {
      handleSoundBankCancel,
      handleSoundBankClose
    } = this;

    const {
      showSoundBank
    } = this.state;

    const {
      ui,
      keys
    } = this.props;

    return (
      <div>
        <div>{ui}</div>
        <Qwerty 
          keys={keys} 
        />
        {showSoundBank &&
          <SoundBank 
            handleCancel={handleSoundBankCancel}
            handleClose={handleSoundBankClose}
          />
        }
      </div>
    );
  }
};

export default MusicApplication;