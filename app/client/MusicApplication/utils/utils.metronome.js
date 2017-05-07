import { METRONOME_RATIO_LIST } from '../constants/metronome';

let index = 0;

const getLoopDuration = (ratio, bpm) => ratio * (60 / bpm);

const getInterval = (ratio, bpm) => getLoopDuration(ratio, bpm) / 64;

export const getSchedule = (ctx, ratio, bpm = 100) => {
  const timeStamp = ctx.currentTime;
  const interval = getInterval(ratio, bpm);
  const schedule = [
    { scheduled: false, time: timeStamp + (interval * 2), beat: index + 2 },
    { scheduled: false, time: timeStamp + interval, beat: index + 1 },
    { scheduled: false, time: timeStamp, beat: index }
  ];
  index += 1;
  return schedule;
};
