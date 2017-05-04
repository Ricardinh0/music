import React from 'react';
import ReactDOM from 'react-dom';
import AudioContext from './MusicApplication/utils/utils.audioContext';
import MusicApplication from './MusicApplication/';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const container = document.getElementById('root');
const ctx = new AudioContext();
const master = ctx.createGain();
master.connect(ctx.destination);

ReactDOM.render(
  <MusicApplication
    audioMaster={{
      ctx,
      master
    }}
    ui={container.getAttribute('ui')}
  />, container);
