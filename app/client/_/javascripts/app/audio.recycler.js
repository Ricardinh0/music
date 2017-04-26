define([
  'knockout',
  'text!template/recycler',
  'audio.bufferCanvas',
  'audio.bufferPlayer',
  'audio.qwerty',
  'utils.GUID'
], function(ko, Template, BufferCanvas, BufferPlayer, Qwerty, GUID){

  function Recycler(params){

    var self = this;
    //
    this.track = {};
    this.bufferCanvas = new BufferCanvas();
    this.bufferPlayer = new BufferPlayer({ ctx: params.ctx });
    this.qwerty = new Qwerty({
      onSelected: function(keyChar){
        self.save(keyChar);
      }
    });
    this.isRecycling = ko.observable(false);
    this.buffer = undefined;
    this.onSave = undefined;
    this.isRecycling.subscribe(function(value){
      if ( !value ) {
        self.bufferPlayer.clear();
      }
    })
    this.playToggle = function(){
      self.bufferPlayer.setBuffer(self.track);
    };
  }
  /**
  *
  *   Template
  *
  */
  Recycler.prototype.recycle = function(buffer){
    if ( !buffer ) return false;
    this.buffer = buffer;
    //
    this.track = {
      id: new GUID().getID(),
      buffer: buffer
    };
    //
    this.bufferPlayer.setBuffer(this.track);
    this.bufferCanvas.paint(buffer);
    this.isRecycling(true);
  };
  /**
  *
  *   Template
  *
  */
  Recycler.prototype.save = function(keyChar){
    var buffer = this.buffer;
    this.isRecycling(false);
    if ( this.onSave ) this.onSave({
      keyChar: keyChar,
      buffer: buffer
    });
    this.buffer = undefined;
  };
  /**
  *
  *   Template
  *
  */
  Recycler.prototype.cancel = function(buffer){
    this.buffer = undefined;
    this.isRecycling(false);
  };
  /**
  *
  *   Template
  *
  */
  Recycler.prototype.template = function(){
    var recycler = document.createElement('div');
    recycler.innerHTML = Template;
    return recycler;
  };

  return Recycler;
})