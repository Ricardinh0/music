define([

],function(){

  function BufferLoader(params) {
    this.context = params.context;
    this.onComplete = params.onComplete;
    this.onSubmit = params.onSubmit;
    this.onError = params.onError;
  }
  BufferLoader.prototype.decodeBuffer = function(arrayBuffer, index) {
    var self = this;
    var index = index || 0;
    // Asynchronously decode the audio file data in request.response
    self.context.decodeAudioData(
      arrayBuffer,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        self.onComplete(buffer);
      },
      function(error) {
        if (typeof self.onError === 'function') self.onError(error);
      }
    );
  };

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

  return BufferLoader;
});