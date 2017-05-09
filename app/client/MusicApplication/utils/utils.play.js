export default (ctx, inputNode, key, schedule) => {
  const sound = ctx.createBufferSource();
  const node = inputNode;
  sound.buffer = key.buffer;
  sound.playbackRate.value = key.playbackRate;
  sound.connect(node);
  if (schedule) {
    sound.start(schedule);
  } else {
    sound.start();
  }
};
