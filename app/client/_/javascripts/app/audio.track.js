define([
  'knockout',
  'alertify',
  'text!template/track',
  'audio.metronome',
  'audio.mjolnir',
  'audio.utils',
  'audio.recycler',
  'audioBufferToWav',
  'audio.recorderConfig',
  'audio.keyAction',
  'audio.publisher',
  'audio.saveTrack',
  'audio.deleteTrack'
], function(ko, alertify, Template, Metronome, Mjolnir, AudioUtils, Recycler, toWav, RecorderConfig, KeyAction, Publisher, saveTrack, deleteTrack){

  function Track(params){
    //
    var self = this;
    var module = undefined;
    //
    this.model = params.model;
    //
    this.ctx = params.ctx || undefined;
    this.master = params.master || undefined;
    this.IDB = params.IDB || undefined;
    this.soundbank = params.soundbank || undefined;
    this.module = ko.observableArray();
    this.audioUtils = new AudioUtils();
    this.publisher = new Publisher({ 
      ctx: params.ctx,
      id: this.model.id(),
      onOpen: function(){
        self.keyAction.block(true);
      },
      onClose: function(){
        self.keyAction.block(false);
      } 
    });
    this.recycler = new Recycler({ ctx: params.ctx });
    this.recorder = new RecorderConfig(this.master);
    this.isRecording = ko.observable(false);
    this.isEditingName = ko.observable(false);
    //
    this.metronome = new Metronome({
      ctx: this.ctx,
      bpm: this.model.bpm()
    });
    //
    this.model.bpm.subscribe(function(value){
      self.metronome.bpm(value);
    });
    //
    this.master.gain.value = this.model.gain();
    this.model.gain.subscribe(function(value){
      self.master.gain.value = value;
    });
    /*
    *
    *
    */
    this.keyAction = params.keyAction;
    /*
    *
    *
    */
    this.keyAction.add({ keyType: 'ENTER', eventType: 'DOWN', callback: function(keyChar){
        if ( !self.isRecording() ) {
          if ( self.metronome.isPlaying ) {
            self.metronome.playToggle();
          }
          self.record();
        }
      }
    });
    /*
    *
    *
    */
    this.keyAction.add({ keyType: 'ENTER', eventType: 'UP', callback: function(keyChar){
        if ( self.isRecording() ) {
          self.stopRecord();
        }
      }
    });
    /*
    *
    *
    */
    this.keyAction.add({ keyType: 'SPACE', eventType: 'UP', callback: function(keyChar){
        self.metronome.playToggle();
      }
    });
    /*
    *   Callbacks
    */
    this.onDelete = params.onDelete;
    this.onSave = params.onSave;
    this.onClose = params.onClose;
    /*
    * 
    */
    module = this.model.module;
    //
    if ( module.length ) {
      for(var i = 0; i < module.length; i++) {
        this.module.push(this.createModule(module[i]));
      }
    } else {
      this.module.push(this.createModule(this.model.createModule({
        type: 'mjolnir'
      }), params.keyChar, params.buffer));
    }
  }
  /**
  *
  * Punch
  *
  */
  Track.prototype.punch = function(data){
    for (var i = 0; i < this.module().length; i++) {
      this.module()[i].punch(data);
    }
  }
  /**
  *
  * Create a module
  *
  */
  Track.prototype.createModule = function(model, keyChar, buffer){
    //
    var module = {};
    //
    switch(model.type) {
      case 'mjolnir':
        module = new Mjolnir({
          ctx: this.ctx,
          master: this.master,
          model: model,
          metronome: this.metronome,
          soundbank: this.soundbank,
          keyAction: this.keyAction,
          recycler: this.recycler,
          isRecording: this.isRecording,
          keyChar: keyChar || false,
          buffer: buffer || false
        });
        //
        break;
      default:
        return false;
    }
    //
    return module;
  }
  /**
  *
  * Start record
  *
  */
  Track.prototype.record = function() {
    //
    this.recorder.record();
    //
    this.isRecording(true);
  };
  /**
  *
  * Stop record
  *
  */
  Track.prototype.stopRecord = function() {
    //
    var self = this;
    //
    this.recorder.stop();
    //
    this.isRecording(false);
    //
    this.recorder.getBuffer(function(buffer){
      self.audioUtils.bufferFromFloat32Array({
        ctx: self.ctx,
        buffer: buffer,
        onComplete: function(recycledBuffer){
          self.recycler.recycle(recycledBuffer);
          self.recorder.clear();
        }
      });
    });
  };
  /**
  *
  * Close track
  *
  */
  Track.prototype.closeTrack = function(data, e) {
    if ( e ) e.target.blur();
    //
    this.metronome.stop();
    //
    this.onClose();
  };
  /**
  *
  * Delete track
  *
  */
  Track.prototype.deleteTrack = function(data, e) {
    //
    if ( e ) e.target.blur();
    //
    if ( this.model.id() === undefined ) return false;
    //
    this.metronome.stop();
    //
    var self = this;
    //
    deleteTrack({
      model: this.model,
      onComplete: function(){
        self.onDelete({
          id: self.model.id(),
          name: self.model.name()
        });
      }
    });
  };
  /**
  *
  * Save track
  *
  */
  Track.prototype.saveTrack = function(data, e) {
    //
    if (e) e.target.blur();
    //
    var self = this;
    //
    saveTrack({
      model: this.model,
      IDB: this.IDB,
      onComplete: function(params){
        self.model.id(params.id);
        self.onSave({
          id: self.model.id(),
          name: self.model.name()
        });
      }
    });
  };
  /**
  *
  * Publish track
  *
  */
  Track.prototype.publishTrack = function(data, e) {
    // Blur button to stop enter key click
    if ( e ) e.target.blur();
    if ( this.metronome.isPlaying ) this.metronome.stop();
    //
    var self = this;
    //
    this.publisher.publish({
      ctx: this.ctx,
      model: this.model,
      metronome: this.metronome,
      recorder: this.recorder,
      onRecord: function(isRecording){
        self.isRecording(isRecording);
      }
    });
  };
  /**
  *
  *   Template
  *
  */
  Track.prototype.template = function(){
    var mjolnir = document.createElement('div');
    mjolnir.innerHTML = Template;
    return mjolnir;
  };

  return Track;
});