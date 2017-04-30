import React, { Component } from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';
import SoundBank from '../SoundBank/SoundBank';
import Track from '../Track/Track';

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

  isKeyActive = (keyCode) => {
    const { keys } = this.props;
    return keys.filter(obj => obj.active && obj.keyCode === keyCode).length
  };

  isKeyWhiteListed = (keyCode) => {
    const { keys } = this.props;
    return keys.filter(obj => obj.keyCode === keyCode).length
  };

  handleKeyUp = (e) => {
    const { keyCode } = e;
    const { isKeyActive, isKeyWhiteListed } = this;
    const { 
      soundBank: {
        visible: showSoundBank
      }
    } = this.props;
    if (isKeyWhiteListed(keyCode) && !showSoundBank) {
      if (isKeyActive(keyCode)) {
        console.log('punch');
      }
    }
  };

  handleKeyDown = (e) => {
    const { keyCode } = e;
    const {
      handleKeyActivate,
      handleSoundbankShow,
      soundBank: {
        visible: showSoundBank
      }
    } = this.props;
    const { isKeyActive, isKeyWhiteListed } = this;
    if (isKeyWhiteListed(keyCode) && !showSoundBank) {
      if (!isKeyActive(keyCode)) {
        handleSoundbankShow();
        handleKeyActivate(e);
        this.setState({
          currentKeyCode: e.keyCode
        })
      }
    }
  };

  handleSoundBankCancel = () => {
    const {
      currentKeyCode
    } = this.state;
    const {
      handleKeyDeactivate,
      handleSoundbankShow
    } = this.props;
    handleKeyDeactivate({ keyCode: currentKeyCode });
    handleSoundbankShow();
  }

  handleSoundBankClose = () => {
    const { 
      handleSoundbankShow
    } = this.props;
    handleSoundbankShow();
    this.setState({
      currentKeyCode: undefined
    });
  }

  render() {

    const {
      handleSoundBankCancel,
      handleSoundBankClose,
      handleKeyDown
    } = this;

    const {
      ui,
      keys,
      handleKeyDeactivate,
      soundBank: {
        visible: showSoundBank
      }
    } = this.props;

    const activeKeys = keys.filter(key => key !== undefined && key.active);

    return (
      <div>
        <div>{ui}</div>
        <Qwerty 
          keys={keys}
          handleClick={handleKeyDown}
        />
        {showSoundBank &&
          <SoundBank 
            handleCancel={handleSoundBankCancel}
            handleClose={handleSoundBankClose}
          />
        }
        {!!activeKeys.length &&
          <Track 
            keys={activeKeys} 
            handleKeyDeactivate={handleKeyDeactivate}
          />
        }
      </div>
    );
  }
};

export default MusicApplication;