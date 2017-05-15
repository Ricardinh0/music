import React, { Component } from 'react';
import Qwerty from '../Qwerty/Qwerty';
import SoundBankContainer from '../../containers/SoundBankContainer';
import TrackContainer from '../../containers/TrackContainer';
import play from '../../utils/utils.play';

class MusicApplication extends Component {

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
    return keys.filter(obj => obj.active && obj.keyCode === keyCode)
  };

  isKeyWhiteListed = (keyCode) => {
    const { keys } = this.props;
    return keys.filter(obj => obj.keyCode === keyCode)
  };

  handleKeyUp = (e) => {
    const { keyCode } = e;
    const { isKeyActive, isKeyWhiteListed } = this;
    const {
      audioMaster: { ctx, master },
      soundBank: { visible: soundBankVisible }
    } = this.props;
    const key = isKeyActive(keyCode);
    if (isKeyWhiteListed(keyCode).length && !soundBankVisible) {
      if (key.length) {
        play(ctx, master, key[0]);
      }
    }
  };

  handleKeyDown = (e) => {
    const { keyCode } = e;
    const {
      handleSoundbankShow,
      soundBank: { visible: soundBankVisible }
    } = this.props;
    const { isKeyActive, isKeyWhiteListed } = this;
    const key = isKeyActive(keyCode);
    if (isKeyWhiteListed(keyCode).length && !soundBankVisible) {
      if (!key.length) {
        handleSoundbankShow(e);
      }
    }
  };

  render() {

    const {
      handleKeyDown
    } = this;

    const {
      keys,
      soundBank: {
        visible: soundBankVisible
      }
    } = this.props;

    return (
      <div>
        <Qwerty
          keys={keys}
          handleClick={handleKeyDown}
        />
        {soundBankVisible &&
          <SoundBankContainer />
        }
        {!!keys.filter(key => key !== undefined && key.active).length &&
          <TrackContainer />
        }
      </div>
    );
  }
};

export default MusicApplication;