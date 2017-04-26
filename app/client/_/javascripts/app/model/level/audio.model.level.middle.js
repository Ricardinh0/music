define([
  'knockout',
  'utils.GUID'
], function(ko, GUID, LFO){
  function Middle(params){
    this.id = params.id || new GUID().getID();
    this.type = 'middle';
    this.level = ko.observable(params.level || 1);
  }
  return Middle;
});