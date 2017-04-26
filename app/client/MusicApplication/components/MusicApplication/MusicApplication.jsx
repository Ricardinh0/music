import React from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';

const MusicApplication = ({
  ui
}) => {

  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.connect(ctx.destination);

  return (
    <div>
      <div>{ui}</div>
      <Qwerty />
    </div>
  );
};

export default MusicApplication;



/**
*
*   Setup AudioContext
*
*/
//const AudioContext = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
/*
  componentWillMount(){
      BannerDataStore.addChangeListener(this._onchange);
      document.addEventListener("click", this._handleDocumentClick, false);
      document.addEventListener("keydown", this._handleKeyDown.bind(this));
  },
  componentWillUnmount() {
      BannerDataStore.removeChangeListener(this._onchange);
      document.removeEventListener("click", this._handleDocumentClick, false);
      document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  },
*/