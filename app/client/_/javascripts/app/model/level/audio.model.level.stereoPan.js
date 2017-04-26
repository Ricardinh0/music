define([
  'knockout',
  'utils.GUID',
  'audio.model.level.LFO'
], function(ko, GUID, LFO){
  function StereoPan(params){
    this.id = params.id || new GUID().getID();
    this.type = 'stereoPan';
    this.level = ko.observable(params.level || 0);
    //
    LFO.call(this, params);
  }
  return StereoPan;
});