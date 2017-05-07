import React, { Component } from 'react';
import play from '../../utils/utils.play';
import requestAnimationFrame from '../../utils/utils.requestAnimationFrame';
import { getSchedule } from '../../utils/utils.metronome';

let schedule = {};

class Metronome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying } = nextProps;
    this.setState({ 
      isPlaying: isPlaying
    }, () => {
      if (isPlaying) {
        this.tick();
      }
    });
  }

  componentWillMount() {
    const { handleKeyUp } = this;
    document.addEventListener('keyup', handleKeyUp);
  }

  componentWillUnmount() {
    const { handleKeyUp } = this;
    document.removeEventListener('keyup', handleKeyUp);
  }

  tick = () => {
    const { isPlaying } = this.state;
    const { audioMaster: { ctx }, keys } = this.props;

    schedule = getSchedule(ctx, 4);
    
    keys.filter(key => key !== undefined && key.active).map((key, i) => {
      //console.log(key.steps);
    });

    // console.log(4, schedule[4], schedule[4].pop());
    // console.log(8, schedule[8], schedule[8].pop());



    if (isPlaying) {
      requestAnimationFrame(this.tick)
    }
  }

  handleKeyUp = e => {
    const { 
      isPlaying, 
      soundBank: { visible: soundBankVisible },
      handleStop,
      handlePlay
    } = this.props;
    if (!soundBankVisible && e.keyCode === 32) {
      isPlaying ? handleStop() : handlePlay();
    }
  }

  render() {
    const {
      isPlaying,
    } = this.props;

    return (
      <div>
        <span>{`${isPlaying}`}</span>
      </div>
    );
  }
};

export default Metronome;
