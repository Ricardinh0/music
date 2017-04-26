define([
], function(){

  function AudioUtils(){

  }

  AudioUtils.prototype.reverseBuffer = function(params){
    var ctx = params.ctx;
    var buffer = params.buffer;
    var onComplete = params.onComplete;
    //
    var slice = ctx.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
    //  Create new buffer like the existing buffer but with the bite length
    for ( var i = 0; i < buffer.numberOfChannels; i++ ) {

      var reversedBuffer = buffer.getChannelData(i).map(function(index){
        return index;
      });
      slice.copyToChannel(reversedBuffer.reverse(), i);

    }
    //
    onComplete(slice);
  };
  
  AudioUtils.prototype.cutBuffer = function(params){
    //
    var ctx = params.ctx;
    var buffer = params.buffer;
    var startPoint = params.startPoint;
    var stopPoint = params.stopPoint;
    var onComplete = params.onComplete;
    //  Set an index
    var index = 0;
    //  Create new buffer like the existing buffer but with the bite length
    var slice = ctx.createBuffer(buffer.numberOfChannels, stopPoint-startPoint, buffer.sampleRate);
    //
    for(var i = 0; i < slice.numberOfChannels; i++) {
      //  Set channel
      var sliceData = slice.getChannelData(i);
      //  Get existing buffer's channel data
      var bufferData = buffer.getChannelData(i);
      //  For each frame in the existing buffer's channel data
      for (var j = 0; j < bufferData.length; j++) {
        //  If the frame is >= the startPoint marker and <= the to marker
        if ( j >= startPoint && j <= stopPoint ){
          //  Assign the frame to the bite at the current index
          sliceData[index] = bufferData[j];
          //  Increment index
          index++;
        }
      }
      index = 0;
    }
    onComplete(slice);
    return;
  };

  AudioUtils.prototype.bufferFromFloat32Array = function(params){
    var arrayBuffer = params.buffer;
    var ctx = params.ctx;
    if (arrayBuffer === undefined) return null;
    //  Create buffer if buffers defined
    var buffer = ctx.createBuffer( 2, arrayBuffer[0].length, ctx.sampleRate );
    buffer.getChannelData(0).set(arrayBuffer[0]);
    buffer.getChannelData(1).set(arrayBuffer[1]);
    params.onComplete(buffer);
  }

  return AudioUtils;
});