define([
  'knockout',
  'text!template/publisher',
  'audio.wavelabCanvas',
  'audio.bufferCanvas',
  'audio.bufferPlayer',
  'audio.utils',
  'audioBufferToWav',
  'utils.GUID',
  'audio.ajax',
  'X2JS'
], function(ko, Template, WavelabCanvas, BufferCanvas, BufferPlayer, AudioUtils, toWav, GUID, ajax, X2JS){

  function Publisher(params) {
    var self = this;
    this.id = params.id;
    this.name = 'Untitled';
    this.onOpen = params.onOpen;
    this.onClose = params.onClose;
    this.audioUtils = new AudioUtils();
    this.isPublishing = ko.observable(false);
    this.isProcessing = ko.observable(false);
    this.isChoosing = ko.observable(false);
    this.isSaving = ko.observable(false);
    this.track = {};
    this.blob = null;
    this.bufferCanvas = new BufferCanvas();
    this.bufferPlayer = new BufferPlayer({ ctx: params.ctx });
    this.x2js = new X2JS();

    this.isPublishing.subscribe(function(value){
      if ( value ) {
        self.onOpen();
      } else {
        self.onClose();
      }
    });

    this.playToggle = function(){
      self.bufferPlayer.setBuffer(self.track);
    };

  }

  Publisher.prototype.publish = function(params){
    // 
    this.isPublishing(true);
    //
    this.isProcessing(true);
    //
    var self = this;
    var ctx = params.ctx;
    var model = params.model;
    var recorder = params.recorder;
    var metronome = params.metronome;
    var onRecord = params.onRecord;
    var loopRatio = 0;
    //
    this.name = model.name();
    //
    for (var i = 0; i < model.module.length; i++) {
      for (var j = 0; j < model.module[i].channel.length; j++) {
        var ratio = parseInt(model.module[i].channel[j].ratio);
        ratio  = ratio < 16 ? 16 : ratio;
        if ( loopRatio < ratio ) {
          loopRatio = ratio;
        }
      }
    }
    //
    recorder.record();
    onRecord(true);
    //
    metronome.addLoopEvent(loopRatio, function(loopDuration){
      //  Stop recording
      recorder.stop();
      onRecord(false);
      //  Remove event
      metronome.removeLoopEvent();
      //
      recorder.getBuffer(function(buffers){
        //
        var src = ctx.createBufferSource();
        var buffer = ctx.createBuffer( 2, buffers[0].length, ctx.sampleRate );
        //
        buffer.getChannelData(0).set(buffers[0]);
        buffer.getChannelData(1).set(buffers[1]);
        //
        var duration = buffer.duration;
        //
        var startPoint = Math.floor(buffer.sampleRate * ( loopDuration / 5 ));
        var stopPoint = Math.floor(buffer.sampleRate * loopDuration);
        //
        self.audioUtils.cutBuffer({
          ctx: ctx,
          buffer: buffer,
          startPoint: startPoint,
          stopPoint: stopPoint,
          onComplete: function(audioBuffer){
            var wavArrayBuffer = toWav(audioBuffer);
            //
            self.blob = new Blob([ new DataView(wavArrayBuffer) ], {
              type: 'audio/wav'
            });
            //
            self.bufferCanvas.paint(audioBuffer);
            //
            self.track = {
              id: new GUID().getID(),
              buffer: audioBuffer
            };
            //
            self.isProcessing(false);
            self.isChoosing(true);
            //  Clear the recorder
            recorder.clear();
          }
        });
      });
    });
  };
  /**
  *
  *   Save
  *
  */
  Publisher.prototype.save = function(){
    //
    //
    var self = this;
    var blob = this.blob;
    var id = this.id;
    var name = this.name;
    //
    self.isChoosing(false);
    self.isSaving(true);
    //
    var formData = new FormData();
    //
    ajax({
      type: 'GET',
      url: '/s3_credentials?filename=' + id + '&content_type=' + blob.type,
      data: '',
      success: function() {

        var res = JSON.parse(this.responseText);
        var policy = res.params;
        var url = res.endpoint_url;

        for ( var key in policy ) {
          formData.append(key, policy[key]);
        }

        formData.append('file', blob);

        ajax({
          type: 'POST',
          url: url,
          data: formData,
          success: function() {
            var res = self.x2js.xml_str2json(this.responseText.toString()).PostResponse;
            if (res.Location) {
              ajax({
                type: 'POST',
                url: '/publish',
                contentType: 'application/json',
                data: JSON.stringify({
                  _id: id,
                  url: res.Location,
                  name: name
                }),
                success: function(){
                  var res = JSON.parse(this.responseText);
                  //
                  self.isSaving(false);
                  self.isPublishing(false);
                  //
                  console.log(res);
                }
              });
            }
          }
        });
      }
    });
  };
  /**
  *
  *   Cancel
  *
  */
  Publisher.prototype.cancel = function(){
    this.bufferPlayer.clear();
    this.isPublishing(false);
    this.isProcessing(false);
    this.isChoosing(false);
    this.isSaving(false);
  };
  /**
  *
  *   Template
  *
  */
  Publisher.prototype.template = function(){
    var publisherWrap = document.createElement('div');
    publisherWrap.innerHTML = Template;
    return publisherWrap;
  };

  return Publisher;
});