define([
  'audio.bufferLoader'
], function(BufferLoader){

  return function(params){

    var ctx = params.ctx || new AudioContext();
    var bufferList = [];
    var isPlaying = false;
    var playingTrackId = '';
    var trackSrc = null;

    var get = function(){
      return trackSrc;
    };

    var set = function(src){
      trackSrc = src;
    };

    var playBuffer = function (buffer){
      var src = ctx.createBufferSource();
      set(src);
      src.buffer = buffer;
      src.connect(ctx.destination);
      src.loop = true;
      src.start(0);
      isPlaying = true;
    };

    var stopBuffer = function (){
      var src = get();
      if (src) src.stop();
      isPlaying = false;
    };

    var playToggle = function(params){
      if ( params.id && playingTrackId !== params.id ) {
        if ( isPlaying ) {
          stopBuffer();
        }
        playBuffer(params.buffer);
      } else {
        if ( isPlaying ) {
          stopBuffer();
        } else {
          playBuffer(params.buffer);
        }
      }
      playingTrackId = params.id;
      //
      //debugger;
    };

    var updateTrack = function(params){
      //  Set src
      bufferList.push(params);
    };

    var setBuffer = function(params){
      var params = params || {};
      var id = params.id;
      var src = params.src || false;
      var buffer = params.buffer || false;
      var onComplete = params.onComplete || false;

      for ( var i = 0; i < bufferList.length; i++ ) {
        if ( bufferList[i].id === id ) {
          playToggle(bufferList[i]);
          if ( onComplete ) onComplete(isPlaying);
          return false;
        }
      }
      
      if ( buffer ) {
        var track = {
          id: id,
          buffer: buffer
        };
        //
        updateTrack(track);
        //
        playToggle(params);
        //
        if ( onComplete ) {
          onComplete(isPlaying);
        }
        return false;
      }
      
      if ( src ) {
        var bufferLoader = new BufferLoader({
          context: ctx,
          onComplete: function(buffer){
            //
            var track = {
              id: id,
              buffer: buffer
            };
            //
            updateTrack(track);
            //
            playToggle(track);
            //
            if ( onComplete ) {
              onComplete(isPlaying);
            }
            //
          }
        }).loadBuffer({
          src: src
        });
      };
    };

    var getBuffer = function(id){
      var buffer = undefined;
      for ( var i = 0; i < bufferList.length; i++ ) {
        if ( bufferList[i].id === id ){
          buffer = bufferList[i].buffer;
          continue;
        }
      }
      return buffer;
    }

    if ( params.buttonList ){
      var buttonList = params.buttonList;
      for ( var i = 0; i < buttonList.length; i++ ) {
        buttonList[i].onclick = function(e){
          var id = this.getAttribute(params.idTag);
          setBuffer({
            id: id
          });
        };
      }
    }

    return {
      setBuffer: setBuffer,
      getBuffer: getBuffer,
      playToggle: playToggle,
      clear: function(){
        stopBuffer();
        playingTrackId = '';
        trackSrc = null;
      }
    }
    
  };
})