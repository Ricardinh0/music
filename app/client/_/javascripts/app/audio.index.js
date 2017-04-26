define([
  'knockout',
  'mapping',
  'audio.track',
  'audio.model.track',
  'audio.utils',
  'audio.IDB',
  'audio.keyAction',
  'audio.soundbank',
  'audio.qwerty'
],function(ko, mapping, Track, TrackModel, AudioUtils, IDB, KeyAction, Soundbank, Qwerty){
  /**
  *
  *   Setup Knockout global
  *
  */
  ko.mapping = mapping;
  ko.bindingHandlers.element = {
    update: function(element, callBack) {
      var template = callBack();
      element.appendChild(template);
    }
  };
  ko.bindingHandlers.hasSelectedFocus = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      ko.bindingHandlers['hasfocus'].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },        
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      ko.bindingHandlers['hasfocus'].update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
      var selected = ko.utils.unwrapObservable(valueAccessor());
      if (selected) element.select();
    }
  };
  /**
  *
  *   Setup AudioContext
  *
  */
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
  /**
  *
  *   Setup master mixer params
  *
  */
  function DB(){
    /**
    *
    * Statics
    *
    */
    var self = this;
    var ctx = new AudioContext();
    var master = ctx.createGain();
    var view = document.querySelectorAll('#audio')[0];
    /**
    *
    * Master audio node
    *
    */
    master.connect(ctx.destination);
    /**
    *
    * Globals
    *
    */
    this.track = false;
    this.audioUtils = new AudioUtils();
    this.qwerty = new Qwerty({
      onSelected: function(keyChar){
        if ( !self.track ) {
          self.soundbank.open({
            onSelection: function(buffer){
              self.create({
                keyChar: keyChar,
                buffer: buffer
              });
            }
          });
        }
      }
    });
    this.isProcessing = ko.observable(false);
    this.IDBOpen = ko.observable(false);
    //
    this.IDB = new IDB();
    //
    this.getAudioContext = function(){
      return ctx;
    };
    this.getAudioMaster = function(){
      return master;
    };
    //
    this.hasTrack = ko.observable(false);
    //
    this.keyAction = new KeyAction();
    this.keyAction.add({
      keyType: 'KEY',
      eventType: 'UP',
      callback: function(keyChar){
        if ( !self.track ) {
          self.soundbank.open({
            onSelection: function(buffer){
              self.create({
                keyChar: keyChar,
                buffer: buffer
              });
            }
          });
        }
      }
    });
    //
    this.soundbank = new Soundbank({
      ctx: ctx,
      IDB: this.IDB
    });
    /**
    *
    * Events
    *
    */
    window.onbeforeunload = function (e) {
      e = e || window.event;
      var message = 'Any text will block the navigation and display a prompt';
      // For IE6-8 and Firefox prior to version 4
      if (e) e.returnValue = message;
      // For Chrome, Safari, IE8+ and Opera 12+
      return message;
    };
    window.onbeforeunload = null;
    /*
    *
    *
    */
    this.trackList = ko.observableArray(window.trackList);
    //
    this.loadTrack = function(data, e){
      if (e) e.target.blur();
      var id = e.target.getAttribute('data-track-id');
      self.load(id);
    }
    /**
    *
    * Apply bindings
    *
    */
    ko.applyBindings(this, view);
    /**
    *
    * Create default track
    *
    */
    this.IDB.openDB(function(){
      self.IDBOpen(true);
    });
    /*
    *
    */
  }
  /**
  *
  * Update track list
  *
  */
  DB.prototype.updateTrackList = function(params, toDelete) {
    //
    for ( var i = 0; i < this.trackList().length; i++) {
      if (this.trackList()[i]._id === params.id ) {
        //
        if ( toDelete ) this.trackList.splice(i,1);
        //
        if ( this.trackList()[i] ) {
          if ( this.trackList()[i].name !== params.name ) {
            this.trackList()[i].name = params.name;
          }
        }
        return false;
      }
    }
    //
    //
    this.trackList.push({
      name: params.name,
      _id: params.id
    })
  };
  /*
  *
  * Create
  *
  */
  DB.prototype.create = function(params){
    //  Clean
    if ( this.hasTrack() ) this.delete();
    //  Set params
    var params = params || {};
    var model = new TrackModel(params.model || {});
    var id = model.id() || '';
    var self = this;
    //
    this.IDB.getBlob(id, function(data){
      //
      if ( data !== undefined ) {
        var bufferList = data.bufferList;
        var channel = model.module[0].channel;
        for (var i = 0; i < channel.length; i++) {
          for (var j = 0; j < bufferList.length; j++) {
            if ( bufferList[j].id === channel[i].id ) {
              channel[i].wavelab.buffer = bufferList[j].buffer;
            }
          }
        }
        model.module[0].channel = channel;
      }
      //
      self.track = new Track({
        ctx: self.getAudioContext(),
        master: self.getAudioMaster(),
        model: model,
        IDB: self.IDB,
        soundbank: self.soundbank,
        keyAction: self.keyAction,
        keyChar: params.keyChar || false,
        buffer: params.buffer || false,
        onDelete: function(params){
          self.close();
          self.updateTrackList(params, true);
        },
        onSave: function(params){
          self.updateTrackList(params);
        },
        onClose: function(params){
          self.close();
        }
      });
      //
      self.hasTrack(true);
    });
  };
  /**
  *
  * Ajax
  *
  */
  DB.prototype.ajax = function(params) {
    var req = new XMLHttpRequest();
    req.open(params.type, params.url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(params.data);
    req.addEventListener('load', params.success);
  };
  /**
  *
  * Load track
  *
  */
  DB.prototype.load = function(id) {
    //
    var self = this;
    //
    this.isProcessing(true);
    //
    this.ajax({
      type: 'GET',
      url: '/track'+'?id='+id,
      data: '',
      success: function(){
        var model = JSON.parse(this.responseText);
        self.create({
          model: model
        });
        self.isProcessing(false);
      }
    });
  };
  /**
  *
  * Close track
  *
  */
  DB.prototype.close = function() {
    var self = this;
    delete this.track;
    this.track = false;
    this.keyAction.clear();
    this.keyAction.add({
      keyType: 'KEY',
      eventType: 'UP',
      callback: function(keyChar){
        if ( !self.track ) {
          self.soundbank.open({
            onSelection: function(buffer){
              self.create({
                keyChar: keyChar,
                buffer: buffer
              });
            }
          });
        }
      }
    });
    this.hasTrack(false);
    return true;
  };

  return DB;

});