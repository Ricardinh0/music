define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Treble(params){
    this.id = params.id || new GUID().getID();
    this.type = 'treble';
    this.level = ko.observable(params.level || 1);
  }
  return Treble;
});