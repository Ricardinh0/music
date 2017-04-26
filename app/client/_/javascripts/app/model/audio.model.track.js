define([
  'knockout',
  'audio.model.module'
], function(ko, Module){

  function Track(params){
    
    var self = this;
    var params = params || {};
    this.id = ko.observable(params.id || undefined);
    this.name = ko.observable(params.name || 'Untitled');
    this.bpm = ko.observable(params.bpm || 100);
    this.gain = ko.observable(params.gain || 0.5);
    this.module = params.module ? (function(){
      var arr = [];
      for ( var i = 0; i < params.module.length; i++ ) {
        arr.push(new Module(params.module[i]));
      }
      return arr;
    })() : [];
    //
  }

  Track.prototype.createModule = function(params){
    var params = params || {};
    var module = new Module(params);
    this.module.push(module);
    return module;
  }

  return Track;
});



// function Mediator(){

//   var channels = {};

//   var subscribe = function(channel, fn){
//       if (!channels[channel]) channels[channel] = [];
//       channels[channel].push({ context: this, callback: fn });
//       return this;
//   };

//   var publish = function(channel){
//       if (!channels[channel]) return false;
//       var args = Array.prototype.slice.call(arguments, 1);
//       for (var i = 0, l = channels[channel].length; i < l; i++) {
//           var subscription = channels[channel][i];
//           subscription.callback.apply(subscription.context, args);
//       }
//       return this;
//   };

//   return {
//       channels: channels,
//       publish: publish,
//       subscribe: subscribe
//   };
// };


// window.mediator = new Mediator();
