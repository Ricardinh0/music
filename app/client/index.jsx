import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouUpdate from 'why-did-you-update';
import MusicApplication from './MusicApplication/';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const container = document.getElementById('root');

ReactDOM.render(<MusicApplication ui={
  container.getAttribute('ui')
} />, container);
