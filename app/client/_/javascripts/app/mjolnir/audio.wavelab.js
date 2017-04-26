define([
  'knockout',
  'text!template/wavelab',
  'audio.wavelabCanvas',
  'audio.config',
  'audio.utils',
  'audio.bufferLoader',
  'audio.level.playback'
], function(ko, Template, WavelabCanvas, config, AudioUtils, BufferLoader, Playback){



  function Wavelab(params) {

    var params = params || {};
    var self = this;
    //
    this.ctx = params.ctx || null;
    this.model = params.model;
    //
    this.buffer = undefined;
    this.bufferSegment = undefined;
    this.bufferHistory = [];
    this.bufferNeedsCutting = false;
    //
    this.stop = params.stop;
    this.soundbank = params.soundbank;
    this.playback = new Playback({
      model: this.model.playback
    });
    //
    this.audioUtils = new AudioUtils();
    //
    this.canvas = new WavelabCanvas({
      onSegment: function(params){
        self.segmentBuffer(params);
      }
    });

    this.getCanvas = function(element){
      element[0].appendChild(self.canvas.getCanvas());
    };

    //
    if ( this.model.buffer ) {
      if ( typeof this.model.buffer === 'string' ) {

        this.loadSampleFromURL(this.model.buffer);

      } else if ( this.model.buffer.type === 'audio/wav' ) {

        var fileReader = new FileReader();
        fileReader.onload = function() {
          var bufferLoader = new BufferLoader({
            context: self.ctx,
            onComplete: function(buffer){
              self.set(buffer);
            }
          }).decodeBuffer(this.result);
        };
        fileReader.readAsArrayBuffer(this.model.buffer);

      } else if (typeof this.model.buffer === 'object') {

        this.set(this.model.buffer);
        
      }
    } else {
      // this.loadSample();
    }

  }
  /*
  *
  *
  *
  */
  Wavelab.prototype.history = function(action, buffer){
    
    if ( action === 'ADD' ) {

      this.bufferHistory.unshift(buffer);
      this.model.buffer = this.bufferHistory[0];

    } else if ( action === 'REMOVE' ) {

      if ( this.bufferHistory.length <= 1 ) return false;
      this.bufferHistory.shift(buffer);
      this.model.buffer = this.bufferHistory[0];

    }
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.reverseBuffer = function(){
    //
    var self = this;
    //
    this.canvas.clearSelection();
    //
    var buffer = this.getBuffer();
    //
    this.audioUtils.reverseBuffer({
      ctx: this.ctx, 
      buffer: buffer,
      onComplete: function(buffer){
        //
        self.bufferNeedsCutting = false;
        //
        self.history('ADD', buffer);
        //
        self.canvas.paint(buffer);
      }
    });
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.segmentBuffer = function(params){
    //
    var buffer = this.bufferNeedsCutting ? this.bufferHistory[1] : this.bufferHistory[0];
    //
    if (!buffer) return;
    //  Set startPoint/stopPoint to seconds from percentages of the canvas widths
    var self = this;
    var startPoint  = buffer.duration / 100 * params.startPoint;
    var stopPoint  = buffer.duration / 100 * params.stopPoint;
    //  If there is channel data
    if ( buffer.getChannelData(0).length ) {
      //  Set the startPoint and to lengths (sampleRate e.g. 44100 * duration e.g. 2.2 second)
      startPoint = Math.floor(buffer.sampleRate * startPoint);
      stopPoint = Math.floor(buffer.sampleRate * stopPoint);
      //  Create new buffer like the existing buffer but with the bite length
      this.audioUtils.cutBuffer({
        ctx: this.ctx,
        buffer: buffer,
        startPoint: startPoint,
        stopPoint: stopPoint,
        onComplete: function(buffer){
          //
          if ( self.bufferNeedsCutting ) {
            self.history('REMOVE');
            self.history('ADD', buffer);
          } else {
            self.bufferNeedsCutting = true;
            self.history('ADD', buffer);
          }
        }
      });
    }
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.set = function(buffer){
    //  Clear history
    this.bufferHistory = [];
    //
    this.history('ADD', buffer);
    //  Paint canvas
    this.canvas.paint(buffer);
    //  Return false
    return;
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.getBuffer = function(saving){
    return this.bufferHistory[0];
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.getPlayback = function(saving){
    return this.playback.model.level();
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.cutBuffer = function(){
    //
    this.canvas.clearSelection();
    //
    this.bufferNeedsCutting = false;
    //
    this.canvas.paint(this.model.buffer);
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.undoHistory = function(){
    //
    this.canvas.clearSelection();
    //
    this.history('REMOVE');
    //
    this.canvas.paint(this.model.buffer);
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.clearSelection = function(){
    if ( !this.bufferNeedsCutting ) return;
    this.canvas.clearSelection();
    this.history('REMOVE');
    this.bufferNeedsCutting = false;
    this.canvas.paint(this.model.buffer);
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.hasBuffer = function(){
    return this.bufferHistory.length;
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.loadSample = function(){
    //
    var self = this;
    //  Open the sound back and set a selection callback
    this.soundbank.open({
      onSelection: function(buffer){
        //  On new sample set the wavelab buffer
        self.set(buffer);
      }
    });
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.loadSampleFromURL = function(url){
    //
    var self = this;
    //
    var bufferLoader = new BufferLoader({
      context: this.ctx,
      onSubmit: function(){
        //
      },
      onComplete: function(buffer){
        //
        self.set(buffer);
      },
      onError: function(error){
        //  Catch error
        console.log(error);
      }
    }).loadBuffer({
      src: url
    });
  };
  /*
  *
  *
  *
  */
  Wavelab.prototype.template = function(){
    //  Create template wrap
    var template = document.createElement('div');
    //  Set the inner HTML to the current partial
    template.innerHTML = Template;
    //  Return template
    return template;
  };

  return Wavelab;

























  // return function(params){

  //   var params = params || {};
  //   var model = params.model;
  //   var playback = new Playback({
  //     model: model.playback
  //   });


    
  //   var bufferSegment = undefined;
  //   var bufferHistory = [];
  //   var bufferToSave = false;
  //   var audioUtils = new AudioUtils();
  //   var canvas = document.createElement('canvas');
  //   var ctx = canvas.getContext('2d');

  //   canvas.width = config.canvas.buffer.width.toString();
  //   canvas.height = '200';
  //   canvas.style.border = '4px solid #dddddd';

  //   var audioCtx = params.ctx || null;
  //   var canPaintOverlay = false;
  //   var startPoint = 0;
  //   var stopPoint = 0;

  //   var paint = function(){

  //     if ( !model.buffer ) {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       return;
  //     }

  //     var channelData = [];
  //     var chunk = 0;
  //     var split = 0;

  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.fillStyle = config.canvas.buffer.bkg;
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);

      
  //     if ( model.buffer.numberOfChannels > 1 ) {

  //       for (var i = 0; i < model.buffer.numberOfChannels; i++) {

  //         channelData = model.buffer.getChannelData(i);
  //         chunk = Math.floor(channelData.length / canvas.width);
  //         split = 0;

  //         for (var j = 0; j < channelData.length; j++) {

  //           if(j === split){
  //             var bite = channelData[j];
  //             var height = ( bite > 0 ) ? (bite*-1) * canvas.height : bite * canvas.height;
  //             if (i===1) {
  //               height = height*-1;
  //             }
  //             ctx.fillStyle = config.canvas.buffer.wave;
  //             ctx.fillRect( split/chunk , canvas.height / 2, 1, height / 2);
  //             split += chunk;
  //           }
  //         }
  //       }
  //     } else {

  //       channelData = model.buffer.getChannelData(0);
  //       chunk = Math.floor(channelData.length / canvas.width);
  //       split = 0;

  //       for (var i = 0; i < channelData.length; i++) {
  //         if(i === split){
  //           ctx.fillStyle =config.canvas.buffer.wave;
  //           ctx.fillRect( split/chunk , canvas.height / 2, 1, (channelData[i] * canvas.height) / 2);
  //           split += chunk;
  //         }
  //       }
  //     }
  //   };

  //   // if ( buffer ) paint();

  //   var paintOverlay = function(e){
  //     if ( !stopPoint && !startPoint ) return;
  //     var position = {
  //       x: stopPoint,
  //       y: 0
  //     };
  //     //
  //     if (canPaintOverlay) {
  //       position = getCoords(canvas, e);
  //     }
  //     //
  //     ctx.fillStyle = config.canvas.buffer.chunk;
  //     //
  //     ctx.fillRect(startPoint, 0, position.x - startPoint, canvas.height);
  //   };

  //   var paintMarker = function(e, addTracker){
  //     paint();
  //     paintOverlay(e);
  //     if (addTracker) {
  //       var position = getCoords(canvas, e);
  //       ctx.fillStyle = 'red';
  //       ctx.fillRect(position.x, 0, 1, canvas.height);
  //     }
  //   }

  //   var getCoords = function(canvas, e){
  //     var rect = canvas.getBoundingClientRect();
  //     return {
  //       x: e.clientX - rect.left,
  //       y: e.clientY - rect.top
  //     };
  //   };
  //   //
  //   var reverseBuffer = function(){
  //     //  Clear bite
  //     clearBufferSegment();
  //     //
  //     model.buffer = audioUtils.reverseBuffer({
  //       ctx: ctx, 
  //       buffer: model.buffer
  //     });
  //     //
  //     //bufferUpdate(buffer, hasBufferModified());
  //     //
  //     paint();
  //   }
  //   /*
  //   * Segment buffer to what user has selected
  //   */
  //   var segmentBuffer = function(params){
  //     //
  //     var buffer = model.buffer;
  //     //
  //     if (!buffer) return;
  //     //  Set startPoint/stopPoint to seconds from percentages of the canvas widths
  //     var startPoint  = buffer.duration / 100 * params.startPoint;
  //     var stopPoint  = buffer.duration / 100 * params.stopPoint;
  //     //  If there is channel data
  //     if ( buffer.getChannelData(0).length ) {
  //       //  Set the startPoint and to lengths (sampleRate e.g. 44100 * duration e.g. 2.2 second)
  //       startPoint = Math.floor(buffer.sampleRate * startPoint);
  //       stopPoint = Math.floor(buffer.sampleRate * stopPoint);
  //       //  Clear bite
  //       clearBufferSegment();
  //       //  Create new buffer like the existing buffer but with the bite length
  //       audioUtils.cutBuffer({
  //         ctx: audioCtx,
  //         buffer: buffer,
  //         startPoint: startPoint,
  //         stopPoint: stopPoint,
  //         onComplete: function(buffer){
  //           bufferToSave = true;
  //           bufferSegment = buffer;
  //           //bufferUpdate(buffer, hasBufferModified());
  //         }
  //       });
  //     }
  //   };

  //   var clearBufferSegment = function(){
  //     bufferToSave = false;
  //     bufferSegment = undefined;
  //   };

  //   var getBuffer = function(saving){
  //     if (saving) bufferToSave = false;
  //     return bufferSegment !== undefined ? bufferSegment : model.buffer;
  //   };

  //   var set = function(buffer, addSavePoint){
  //     //  
  //     bufferToSave = addSavePoint ? true : false;
  //     //  Clear bufferSegment if any 
  //     if ( bufferSegment ) clearBufferSegment();
  //     //  Clear history
  //     bufferHistory = [];
  //     //  Set the new buffer's data
  //     model.buffer = buffer;
  //     //
  //     //bufferUpdate(buffer, hasBufferModified());
  //     //
  //     stopPoint = 0;
  //     startPoint = 0;
  //     //  Paint canvas
  //     paint();
  //     //  Return false
  //     return;
  //   };

  //   var saveToBufferHistory = function(){
  //     if (!bufferSegment) return;
  //     bufferHistory.unshift(model.buffer);
  //     model.buffer = bufferSegment;
  //     //bufferUpdate(buffer, hasBufferModified());
  //     bufferSegment = undefined;
  //     paint();
  //   };

  //   var undoBufferHistory = function(){
  //     if ( !bufferHistory.length ) return;
  //     model.buffer = bufferHistory.shift();
  //     //bufferUpdate(buffer, hasBufferModified());
  //     bufferSegment = undefined;
  //     bufferToSave = true;
  //     paint();
  //   };

  //   var clearSelection = function(){
  //     startPoint = 0;
  //     stopPoint = 0;
  //     bufferSegment = undefined;
  //     paint();
  //   };

  //   var hasBuffer = function(){
  //     return model.buffer ? true : false;
  //   };

  //   var hasBufferModified = function(){
  //     return bufferHistory.length > 0 || bufferToSave;
  //   };

  //   var template = function(){
  //     //  Create template wrap
  //     var template = document.createElement('div');
  //     //  Set the inner HTML to the current partial
  //     template.innerHTML = Template;
  //     //  Add the canvas
  //     template.appendChild(canvas);
  //     //  Return template
  //     return template;
  //   };

  //   var stop = params.stop;
  //   var soundbank = params.soundbank;

  //   var loadSample = function(){
  //     stop();
  //     //  Open the sound back and set a selection callback
  //     soundbank.open({
  //       onSelection: function(buffer){
  //         //  On new sample set the wavelab buffer
  //         set(buffer, true);
  //       }
  //     });
  //   };

  //   var loadSampleFromURL = function(url){
  //     //
  //     stop();
  //     //
  //     var bufferLoader = new BufferLoader({
  //       context: audioCtx,
  //       onSubmit: function(){
  //         //  Set loading to true
  //         // self.isLoading(true);
  //       },
  //       onComplete: function(buffer){
  //         //  Set loading to false
  //         // self.isLoading(false);
  //         //  Set canvas. Wavelab will return false if a canvas already exists
  //         set(buffer, false);
  //       },
  //       onError: function(error){
  //         //  Set loading to false
  //         // self.isLoading(false);
  //         //  Catch error
  //         console.log(error);
  //       }
  //     }).loadBuffer({
  //       src: url
  //     });
  //   };

  //   var getPlayback = function(){
  //     return this.playback.model.level();
  //   }

  //   if ( model.buffer ) {
  //     if ( typeof model.buffer === 'string' ) {
  //       loadSampleFromURL(model.buffer);
  //     } else if (typeof model.buffer === 'object') {
  //       set(model.buffer, true);
  //     }
  //   }

  //   return {
  //     template:             template,
  //     set:                  set,
  //     getBuffer:            getBuffer,
  //     hasBuffer:            hasBuffer,
  //     hasBufferModified:    hasBufferModified,
  //     saveToBufferHistory:  saveToBufferHistory,
  //     undoBufferHistory:    undoBufferHistory,
  //     clearSelection:       clearSelection,
  //     reverseBuffer:        reverseBuffer,
  //     playback:             playback,
  //     getPlayback:          getPlayback,
  //     loadSample:           loadSample
  //   };

  // };
});