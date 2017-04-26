define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Phaser(params){

    var params = params || {};
    params.mixer = params.mixer || {};

    this.id = params.id || new GUID().getID();
    this.type = 'phaser';

    this.mixer = {
      frequency: ko.observable(params.mixer.frequency || 0.1),
      phase: ko.observable(params.mixer.phase || 1000)
    };

  }
  return Phaser;
});