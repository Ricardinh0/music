import React, { Component } from 'react';
import AudioContext from '../../utils/utils.audioContext';
import Qwerty from '../Qwerty/Qwerty';

const ctx = new AudioContext();
const master = ctx.createGain();
master.connect(ctx.destination);

class MusicApplication extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { handleKeyUp, handleKeyDown } = this.props;
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);
  }

  componentWillUnmount() {
    const { handleKeyUp, handleKeyDown } = this.props;
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('keydown', handleKeyDown);
  }

  render() {
    const {
      ui,
      keys
    } = this.props;
    return (
      <div>
        <div>{ui}</div>
        <div>
          {keys.map((obj, i) => 
            <div key={i} style={{background: obj.active ? 'red' : ''}}>
              {obj.keyCode}
            </div>
          )}
        </div>
        <Qwerty />
      </div>
    );
  }
};

export default MusicApplication;