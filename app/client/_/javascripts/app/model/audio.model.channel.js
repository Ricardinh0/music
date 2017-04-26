define([
  'knockout',
  'utils.GUID',
  'audio.config',
  'audio.model.wavelab',
  'audio.model.filter.delay',
  'audio.model.filter.reverb',
  'audio.model.filter.phaser',
  'audio.model.filter.flanger',
  'audio.model.filter.distortion',
  'audio.model.level.gain',
  'audio.model.level.bass',
  'audio.model.level.middle',
  'audio.model.level.treble',
  'audio.model.level.stereoPan'
], function(ko, GUID, config, Wavelab, Delay, Reverb, Phaser, Flanger, Distortion, Gain, Bass, Middle, Treble, StereoPan){

  function Channel (params){

    var self = this;
    var params = params || {};
    params.level = params.level || [];
    params.filter = params.filter || [];
    params.wavelab = params.wavelab || {};
    //
    this.id = params.id || new GUID().getID();
    this.keyChar = params.keyChar || null;
    this.isMuted = ko.observable(params.isMuted || false);
    this.ratio = params.ratio || 16;
    //
    this.wavelab = new Wavelab({
      buffer: params.wavelab.buffer,
      playback: params.wavelab.playback
    });
    /*
    *
    */
    this.step = ko.observableArray( params.step || (function(){
      var arr = [];
      for(var i = 0; i < config.beatCount; i++){
        arr.push({
          on:false
        });
      }
      return arr;
    })());
    /*
    *
    */
    this.level = [];
    //  Determine the list to render, if no data is preset, take the default list
    var collection = params.level.length ? params.level : config.levelList;

    //  Create preset/default levels
    for ( var i = 0; i < collection.length; i++ ) {
      self.createLevel(collection[i]);
    }
    /*
    *
    */
    this.filter = [];
    //  Create preset filters
    for ( var i = 0; i < params.filter.length; i++ ) {
      this.createFilter(params.filter[i]);
    }
    //
  }

  Channel.prototype.createLevel = function(params){
    var level = {};
    switch(params.type) {
      case 'gain':
        level = new Gain(params);
        break;
      case 'bass':
        level = new Bass(params);
        break;
      case 'middle':
        level = new Middle(params);
        break;
      case 'treble':
        level = new Treble(params);
        break;
      case 'stereoPan':
        level = new StereoPan(params);
        break;
      default:
        return false;
    }
    //
    this.level.push(level);
    //
    return level;
  }

  Channel.prototype.createFilter = function(params){
    var filter = {};
    switch(params.type) {
      case 'delay':
        filter = new Delay(params);
        break;
      case 'reverb':
        filter = new Reverb(params);
        break;
      case 'phaser':
        filter = new Phaser(params);
        break;
      case 'flanger':
        filter = new Flanger(params);
        break;
      case 'distortion':
        filter = new Distortion(params);
        break;
      default:
        return false;
    }
    //
    this.filter.push(filter);
    //
    return filter;
  }

  return Channel;

})