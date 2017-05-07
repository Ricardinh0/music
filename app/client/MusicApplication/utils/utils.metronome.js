import { METRONOME_RATIO_LIST } from '../constants/metronome';

const getLoopDuration = (ratio, bpm) => ratio * (60 / bpm);

const getInterval = (ratio, bpm) => getLoopDuration(ratio, bpm) / 64;

export const getSchedule = (ctx, bpm = 100) => {
  const timeStamp = ctx.currentTime;
  const schedule = {};

  for (let i = 0; i < METRONOME_RATIO_LIST.length; i += 1) {
    const interval = getInterval(METRONOME_RATIO_LIST[i], bpm);
    schedule[METRONOME_RATIO_LIST[i]] = {
      time: [
        timeStamp,
        timeStamp + interval,
        timeStamp + (interval * 2)
      ],
      beat: 15,
      ...interval
    };
  }

  return schedule;
};
