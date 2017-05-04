import React, { Component } from 'react';
import Qwerty from '../Qwerty/Qwerty';
import SoundBankContainer from '../../containers/SoundBankContainer';
import Track from '../Track/Track';

class MusicApplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      handleSoundbankShow,
      soundBank: {
        visible: soundBankVisible
      }
    } = this.props;
    const { isKeyActive, isKeyWhiteListed } = this;
    if (isKeyWhiteListed(keyCode) && !soundBankVisible) {
      if (!isKeyActive(keyCode)) {
        handleSoundbankShow(e);
      }
    }
  };

  render() {

    const {
      handleKeyDown
    } = this;

    const {
      audioMaster,
      keys,
      handleKeyDeactivate,
      soundBank: {
        visible: showSoundBank
      }
    } = this.props;

    const activeKeys = keys.filter(key => key !== undefined && key.active);

    return (
      <div>
        <Qwerty 
          keys={keys}
          handleClick={handleKeyDown}
        />
        {showSoundBank &&
          <SoundBankContainer />
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