define([
  'knockout',
  'utils.GUID',
  'audio.model.level.LFO'
], function(ko, GUID, LFO){
  function Gain(params){
    this.id = params.id || new GUID().getID();
    this.type = 'gain';
    this.level = ko.observable(params.level || 1);
    //
    LFO.call(this, params);
  }
  return Gain;
});