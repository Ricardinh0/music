define([
  'knockout'
], function(ko){
  function Playback(params){
    //
    var params = params || {};
    params.playback = params.playback || {};
    
    this.level = ko.observable(params.playback.level || 1);
  }
  return Playback;
});