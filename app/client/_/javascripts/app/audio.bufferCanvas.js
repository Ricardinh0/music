define([
  'audio.config'
], function(config){

  function BufferCanvas(){
    var self = this;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    //
    this.afterRender = function(element){
      element[0].appendChild(self.canvas);
    }
  }

  BufferCanvas.prototype.paint = function(buffer) {

    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');
    //
    var channelData = [];
    var chunk = 0;
    var split = 0;
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    if ( buffer.numberOfChannels > 1 ) {
      //
      //
      for (var i = 0; i < buffer.numberOfChannels; i++) {
        //
        channelData = buffer.getChannelData(i);
        chunk = Math.floor(channelData.length / canvas.width);
        split = 0;
        //
        for (var j = 0; j < channelData.length; j++) {
          //
          if(j === split){
            var bite = channelData[j];
            var height = ( bite > 0 ) ? (bite*-1) * canvas.height : bite * canvas.height;
            if (i===1) {
              height = height*-1;
            }
            ctx.fillStyle = 'red';
            ctx.fillRect( split/chunk , canvas.height / 2, 1, height / 2);
            split += chunk;
          }
        }
      }
    } else {
      channelData = buffer.getChannelData(0);
      chunk = Math.floor(channelData.length / canvas.width);
      split = 0;
      //
      for (var i = 0; i < channelData.length; i++) {
        if(i === split){
          ctx.fillStyle =config.canvas.buffer.wave;
          ctx.fillRect( split/chunk , canvas.height / 2, 1, (channelData[i] * canvas.height) / 2);
          split += chunk;
        }
      }
    }
  }

  BufferCanvas.prototype.template = function(){
    return document.createElement('div');
  }

  return BufferCanvas;
});