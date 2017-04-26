define([
  'knockout',
  'mapping',
  'alertify',
  'text!template/mjolnir',
  'audio.channel',
  'audio.soundbank',
  'audio.utils',
  'audio.keyAction',
  'audio.triggerKey'
],function(ko, mapping, alertify, Template, Channel, Soundbank, AudioUtils, KeyAction, TriggerKey){

  function Mjolnir(params){
    //
    var self = this;
    //
    this.ctx = params.ctx;
    //
    this.model = params.model || {};
    //
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.1;
    this.master.connect(params.master);
    this.isProcessing = ko.observable(false);
    this.audioUtils = new AudioUtils();
    this.isRecording = params.isRecording;
    /*
    *
    *
    */
    this.metronome = params.metronome;
    this.metronome.addTickEvent('indexPunch', function(data){
      self.punch(data);
    })
    /*
    *
    *
    */
    this.channel = ko.observableArray([]);
    /*
    *
    *
    */
    this.recycler = params.recycler;
    this.recycler.onSave = function(params){
      if ( !self.isProcessing() ) {
        self.keyEvent({
          keyChar: params.keyChar,
          wavelab: {
            buffer: params.buffer
          }
        });
      }
    }
    /*
    *
    *
    */
    this.soundbank = params.soundbank;
    this.soundbank.onOpen = function(){
      self.metronome.stop();
      self.keyAction.block(true);
    }
    this.soundbank.onClose = function(){
      self.keyAction.block(false);
    }
    /*
    *
    *
    */
    this.triggerKey = new TriggerKey();
    /*
    *
    *
    */
    this.keyAction = params.keyAction;
    this.keyAction.add({ keyType: 'KEY', eventType: 'UP', callback: function(keyChar){
        if ( !self.isProcessing() ) {
          self.keyEvent({
            keyChar: keyChar
          });
        }
      }
    });
    /*
    *
    *
    */
    var channel = this.model.channel;
    //
    if ( channel.length ) {
      for(var i = 0; i < channel.length; i++) {
        //  Create channels
        this.channel.push(this.createChannel(channel[i]));
      }
    } else {
      this.channel.push(this.createChannel(this.model.createChannel({
        keyChar: params.keyChar,
        wavelab: {
          buffer: params.buffer
        }
      })));
    }
  }
  /**
  *
  *   Create
  *
  */
  Mjolnir.prototype.createChannel = function(model){
    //
    var channel = new Channel({
      ctx: this.ctx,
      master: this.master,
      model: model,
      soundbank: this.soundbank
    });
    //
    this.triggerKey.addKey(model.keyChar, model.id);
    this.recycler.qwerty.update(model.keyChar, 'ACTIVE');
    //
    this.hideChannel();
    //
    return channel;
  };
  /**
  *
  *   Punch
  *
  */
  Mjolnir.prototype.punch = function(data){
    if ( typeof data === 'object' ) {
      if (this.channel().length) {
        for(var i = 0; i < this.channel().length; i++){
          this.channel()[i].punch({
            data: data
          });
        }
      }
    } else if( typeof data === 'string' ) { // If data is a string it from the key press
      for(var j = 0; j < this.channel().length; j++){
        if ( this.channel()[j].model.id === data ) {
          this.channel()[j].punch();
          break;
        }
      }
    }
  };
  /**
  *
  *   Template
  *
  */
  Mjolnir.prototype.template = function(){
    var mjolnir = document.createElement('div');
    mjolnir.innerHTML = Template;
    return mjolnir;
  };
  /**
  *
  *   Delete
  *
  */
  Mjolnir.prototype.delete = function(id){
    //
    var self = this;
    var deleteChannel = function(){
      for(var i = 0; i < self.channel().length; i++){
        if(self.channel()[i].model.id === id){
          //  Clean triggers
          self.triggerKey.deleteKey(self.channel()[i].model.keyChar);
          //
          self.recycler.qwerty.update(self.channel()[i].model.keyChar, 'INACTIVE');
          //  Delete channel
          self.channel.splice(i,1);
          //  Delete model channel
          self.model.channel.splice(i,1);
          //  Break loop
          break;
        }
      }
    }
    //
    alertify.confirm('Are you sure you want to delete this channel?', function () {
      deleteChannel();
    });
  };
  /**
  *
  *   Key hit
  *
  */
  Mjolnir.prototype.keyEvent = function(params){
    //
    var self = this;
    var params = params || {};
    //  If no keyChar stop
    if ( params.keyChar === undefined ) return false;
    //  If this key is a trigger already
    if ( this.triggerKey.getKey(params.keyChar) ) {
      //  If buffer is present, its a recycle event, therefore cant assign key
      if ( params.buffer !== undefined ) {
        params.onError('Key already assigned');
        return false;
      }
      //  Punch the channel
      this.punch(this.triggerKey.getKey(params.keyChar));
      return;
    } else {
      //  Only create a new channel if the application is not recording
      if ( !this.isRecording() && !this.recycler.isRecycling() ) {
        if ( params.wavelab ) {
          self.channel.push(self.createChannel(self.model.createChannel(params)));
        } else {
          this.soundbank.open({
            onSelection: function(buffer){
              self.channel.push(self.createChannel(self.model.createChannel({
                keyChar: params.keyChar,
                wavelab: {
                  buffer: buffer
                }
              })));
            }
          });
        }
      }
    }
  };
  /**
  *
  *   Key hit
  *
  */
  Mjolnir.prototype.hideChannel = function(){
    if(this.channel().length){
      for(var i = 0; i < this.channel().length; i++){
        if(this.channel()[i].active()){
          this.channel()[i].active(false);
          break;
        }
      }
    }
  };


  return Mjolnir;

});