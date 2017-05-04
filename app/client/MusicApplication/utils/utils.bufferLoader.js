const decodeBuffer = ({
  ctx, 
  arrayBuffer,
  onComplete,
  onError
}) => {
  ctx.decodeAudioData(
    arrayBuffer,
    (buffer) => {
      if (!buffer) return;
      onComplete(buffer);
    },
    (error) => {
      onError(error);
    }
  );
};

const loadBuffer = ({
  ctx,
  src
}) => {

}

BufferLoader.prototype.loadBuffer = function(file, index) {
  // Load buffer asynchronously
  var self = this;
  var request = new XMLHttpRequest();
  var url = file.src;
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  if(typeof self.onSubmit === 'function') self.onSubmit();

  request.onload = function() {
    self.decodeBuffer(request.response, index);
  };

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };

  request.send();
};

export default BufferLoader;

