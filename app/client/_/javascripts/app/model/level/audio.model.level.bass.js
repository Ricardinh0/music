define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Bass(params){
    this.id = params.id || new GUID().getID();
    this.type = 'bass';
    this.level = ko.observable(params.level || 25);
  }
  return Bass;
});