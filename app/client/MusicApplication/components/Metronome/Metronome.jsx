import React, { Component } from 'react';
import play from '../../utils/utils.play';
import requestAnimationFrame from '../../utils/utils.requestAnimationFrame';
import { getSchedule } from '../../utils/utils.metronome';

class Metronome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      bpm: 100
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying: nextIsPlaying } = nextProps;
    const { isPlaying } = this.state;
    if (isPlaying !== nextIsPlaying) {
      this.setState({ 
        isPlaying: nextIsPlaying
      }, () => {
        if (!isPlaying) {
          this.tick();
        }
      });
    }
  }

  componentWillMount() {
    const { handleKeyUp } = this;
    document.addEventListener('keyup', handleKeyUp);
  }

  componentWillUnmount() {
    const { handleKeyUp } = this;
    document.removeEventListener('keyup', handleKeyUp);
  }

  scheduler = (ctx, inputNode, keys, schedule) => {
    for (var i = 0; i < schedule.length; i += 1) {
      let index = schedule[i].beat%16;
      const activeKeyList = keys.filter(key => {
        return key.active && key.steps[index];
      });
      for (var j = 0; j < activeKeyList.length; j += 1) {
        play(ctx, activeKeyList[j].channelInput, activeKeyList[j], schedule[i].time);
      }
    }
  }

  tick = (schedule = []) => {
    const { scheduler } = this;
    const { isPlaying } = this.state;
    const { audioMaster: { ctx, master }, keys, bpm } = this.props;
    const timeStamp = ctx.currentTime;

    if (keys.filter(key => key.active).length) {

      if (schedule.length && timeStamp > schedule[0].time) {
        //  remove all scheduled events apart from the last for reference
        schedule.splice(0, schedule.length - 1);
        //  Update the schedule using the last event as reference
        schedule = getSchedule({
          timeStamp: schedule[0].time,
          ratio: 16,
          beat: schedule[0].beat,
          bpm,
          request: 3
        });
        //  Remove the reference event as this has already been scheduled
        schedule.splice(0, 1);
        scheduler(ctx, master, keys, schedule);
      }
      if (!schedule.length) {
        schedule = getSchedule({
          timeStamp,
          ratio: 16,
          beat: 0,
          bpm,
          request: 3
        });
        scheduler(ctx, master, keys, schedule);
      }
    }

    if (isPlaying) {
      requestAnimationFrame(() => this.tick(schedule))
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

  handleChange = e => {
    const { 
      target: {
        value: bpm 
      }
    } = e;
    const { handleUpdateBPM } = this.props;
    handleUpdateBPM({
      bpm
    });
  }

  render() {
    const {
      handleChange
    } = this;
    const {
      isPlaying,
      bpm
    } = this.props;
    return (
      <div>
        <span>{`${isPlaying}`}</span>
        <input type="range" min="80" max="180" defaultValue={100} onChange={handleChange} />
        <span>{`${bpm}`}</span>
      </div>
    );
  }
};

export default Metronome;
