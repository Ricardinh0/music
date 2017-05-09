const getLoopDuration = (ratio, bpm) => ratio * (60 / bpm);
const getInterval = (ratio, bpm) => getLoopDuration(ratio, bpm) / 64;
const getTime = (timeStamp, interval, index) => timeStamp + (interval * index);
export const getSchedule = (params = {
  timeStamp: 0,
  ratio: 16,
  beat: -1,
  bpm: 100,
  request: 1
}) => {
  const { timeStamp, ratio, beat, bpm, request } = params;
  const interval = getInterval(ratio, bpm);

  let count = request;
  let arr = [];

  do {
    const index = Math.abs(count - request);
    arr = [
      ...arr,
      { time: getTime(timeStamp, interval, index), beat: beat + index }
    ];
    count -= 1;
  } while (count);

  return arr;
};
