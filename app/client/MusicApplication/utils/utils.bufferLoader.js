const bufferLoader = ({
  ctx,
  src,
  onComplete,
  onError
}) => {
  const request = new XMLHttpRequest();
  request.open('GET', src, true);
  request.responseType = 'arraybuffer';
  request.onload = () => {
    ctx.decodeAudioData(
      ...{ ...request }.response,
      (buffer) => {
        if (!buffer) return;
        onComplete(buffer);
      },
      (error) => {
        onError(error);
      }
    );
  };
  request.onerror = () => {
    alert('BufferLoader: XHR error');
  };
  request.send();
};

export default bufferLoader;
