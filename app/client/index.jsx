import React from 'react';
import ReactDOM from 'react-dom';
import MusicApplication from './MusicApplication/';

const container = document.getElementById('root');

ReactDOM.render(<MusicApplication ui={
  container.getAttribute('ui')
} />, container);
