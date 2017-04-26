define([
  'knockout',
  'utils.GUID',
  'text!template/soundbank',
  'audio.bufferPlayer',
  'audio.bufferLoader'
], function(ko, GUID, template, BufferPlayer, BufferLoader){

  function Soundbank(params){

    var self = this;

    this.ctx = params.ctx;
    this.onSelection = params.onSelection;
    this.onOpen = params.onOpen;
    this.onClose = params.onClose;
    this.show = ko.observable(false);
    this.isLoading = ko.observable(true);
    this.bufferPlayer = new BufferPlayer({ ctx: params.ctx });
    this.lastSample = undefined;
    this.currentlyPlaying = ko.observable('');
    this.list = ko.observableArray((function(){
      var list = window.list;
      for ( var i = 0; i < list.length; i++) {
        list[i].children = list[i].children.map(function(obj){
          delete obj.size;
          delete obj.extension;
          obj.play = function() {
            self.play(this);
          };
          obj.select = function() {
            self.select(this);
          };
          obj.isPlaying = ko.observable(false);
          obj.isLoading = ko.observable(false);
          obj.hasBuffer = ko.observable(false);
          return obj;
        });
      }
      return list;
    })());
  }
  /*
  *
  *
  */
  Soundbank.prototype.open = function(params){
    if ( this.onOpen ) this.onOpen();
    this.onSelection = params.onSelection;
    this.show(true);
  };
  /*
  *
  *
  */
  Soundbank.prototype.close = function(){
    if ( this.lastSample !== undefined ) this.lastSample.isPlaying(false);
    this.bufferPlayer.clear();
    if ( this.onClose ) this.onClose();
    this.show(false);
  };
  /*
  *
  *
  */
  Soundbank.prototype.play = function(sample){
    var self = this;
    if ( sample.id === undefined ) sample.id = new GUID().getID();
    sample.isLoading(true);
    this.bufferPlayer.setBuffer({
      id: sample.id,
      src: sample.path, 
      onComplete: function(isPlaying){
        sample.isLoading(false);
        sample.isPlaying(isPlaying);
        if ( !sample.hasBuffer() ) sample.hasBuffer(true);
        if ( self.lastSample !== undefined && sample.id !== self.lastSample.id ) { 
          self.lastSample.isPlaying(false);
        }
        self.lastSample = sample;
      }
    });
  };
  /*
  *
  *
  */
  Soundbank.prototype.select = function(sample){
    var buffer = this.bufferPlayer.getBuffer(sample.id);
    if ( buffer === undefined ) return false;
    this.onSelection(buffer);
    if ( this.onClose ) this.onClose();
    this.lastSample.isPlaying(false);
    this.bufferPlayer.clear();
    this.show(false);
  };
  /*
  *
  *
  */
  Soundbank.prototype.loadFile = function(fileObject){
    //
    if ( fileObject === undefined ) return;
    //
    var self = this;
    //
    var fileURL = (function(){
      if ( fileObject.url === undefined ) {
        return URL.createObjectURL(fileObject);
      } else {
        return fileObject.url;
      }
    })();
    //
    var name = (fileObject) ? fileObject.name : '';
    //
    var bufferLoader = new BufferLoader({
      context: self.ctx,
      onSubmit: function(){
        //  Set loading to true
        self.isLoading(true);
      },
      onComplete: function(buffer){
        //  Set loading to false
        self.isLoading(false);
        //  Set canvas. Wavelab will return false if a canvas already exists
        self.onSelection(buffer);
        self.bufferPlayer.clear();
        self.show(false);
      },
      onError: function(error){
        //  Set loading to false
        self.isLoading(false);
        //  Catch error
        console.log(error);
      }
    }).loadBuffer({
      src: fileURL
    });
  };
  /*
  *
  *
  */
  Soundbank.prototype.template = function(){
    var soundbank = document.createElement('div');
    soundbank.innerHTML = template;
    return soundbank;
  };

  return Soundbank;

})