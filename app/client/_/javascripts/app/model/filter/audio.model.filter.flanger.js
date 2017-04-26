define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Flanger(params){

    var params = params || {};
    params.mixer = params.mixer || {};

    this.id = params.id || new GUID().getID();
    this.type = 'flanger';
    this.mixer = {
      wetDry: ko.observable(params.mixer.wetDry || 0.5),
      delay: ko.observable(params.mixer.delay || 0.005),
      feedback: ko.observable(params.mixer.feedback || 0.9),
      filter: ko.observable(params.mixer.filter || 800),
      intensity: ko.observable(params.mixer.intensity || 0.5),
      frequency: ko.observable(params.mixer.frequency || 0.05)
    };

  }
  return Flanger;
});