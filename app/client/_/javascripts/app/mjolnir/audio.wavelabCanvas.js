define([
  'audio.config',
  'audio.utils'
], function(config, AudioUtils){


  function WavelabCanvas(params) {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var params = params || {};
    //
    this.setupCanvas(canvas);
    //
    this.audioUtils = new AudioUtils();
    this.buffer = false;
    this.startPoint = 0;
    this.stopPoint = 0;
    this.canPaintOverlay = false;
    this.onSegment = params.onSegment;
    //
    this.getCtx = function(){
      return ctx;
    }
    //
    this.getCanvas = function(){
      return canvas;
    }
  };
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.setupCanvas = function(canvas){
    //
    var self = this;
    //
    canvas.width = config.canvas.buffer.width.toString();
    canvas.height = '200';
    /*
     *  Events
    */
    canvas.onmousemove = function(e){
      self.paintMarker(e, true);
    };
    canvas.onmouseout = function(e){
      self.paintMarker(e, false);
    };
    canvas.onmousedown = function(e){
      //  Paint overlay
      self.canPaintOverlay = true;
      //  Set startPoint coord
      self.startPoint = self.getCanvasCoords(e).x;
    };
    canvas.onmouseup = function(e){
      //  Paint overlay
      self.canPaintOverlay = false;
      //  Set to coord
      self.stopPoint = self.getCanvasCoords(e).x;
      //  If a bite has been selected
      if ( self.startPoint !== self.stopPoint ) {
        if ( self.startPoint > self.stopPoint) {
          var hold = self.startPoint;
          self.startPoint = self.stopPoint;
          self.stopPoint = hold;
        }
        //  Bite the buffer and send it the startPoint and to as %s of the canvas width
        if ( self.onSegment ) {
          self.onSegment({
            startPoint: self.startPoint / this.width * 100, 
            stopPoint: self.stopPoint / this.width * 100
          });
        }
      } else {
        //  Clear painted overlay
      }
    };
  };
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.getCanvasCoords = function(e){
    var rect = this.getCanvas().getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.paint = function(buffer){

    var ctx = this.getCtx();
    var canvas = this.getCanvas();
    //
    if ( buffer ) this.buffer = buffer;
    //
    if ( !this.buffer ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return false;
    }
    //
    var buffer = this.buffer;
    //
    var channelData = [];
    var chunk = 0;
    var split = 0;
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    if ( buffer.numberOfChannels > 1 ) {
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
            ctx.fillStyle = config.canvas.buffer.wave;
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
  };
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.paintOverlay = function(e){
    
    var stopPoint = this.stopPoint;
    var startPoint = this.startPoint;

    var ctx = this.getCtx();
    var canvas = this.getCanvas();
    var position = {
      x: stopPoint,
      y: 0
    };
    //
    if ( this.canPaintOverlay ) {
      position = this.getCanvasCoords(e);
    }
    //
    ctx.fillStyle = config.canvas.buffer.chunk;
    //
    ctx.fillRect(startPoint, 0, position.x - startPoint, canvas.height);
  };
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.paintMarker = function(e, addTracker){
    this.paint();
    this.paintOverlay(e);
    if (addTracker) {
      var position = this.getCanvasCoords(e);
      this.getCtx().fillStyle = 'red';
      this.getCtx().fillRect(position.x, 0, 1, this.getCanvas().height);
    }
  }
  /*
  *
  *
  *
  */
  WavelabCanvas.prototype.clearSelection = function(){
    this.stopPoint = 0;
    this.startPoint = 0;
  }
  /*
  *
  *
  *
  */

  return WavelabCanvas;

})