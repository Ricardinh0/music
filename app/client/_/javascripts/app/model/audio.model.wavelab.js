define([
  'knockout',
  'audio.model.level.playback'
], function(ko, Playback){

  function Wavelab (params){

    this.buffer = params.buffer || false;
    this.playback = new Playback(params);

  }

  return Wavelab;
});