export default (ctx, master, key) => {
  const sound = ctx.createBufferSource();
  const inputNode = master;
  sound.buffer = key.buffer;
  sound.playbackRate.value = key.playbackRate;
  sound.connect(inputNode);
  sound.start();
};
