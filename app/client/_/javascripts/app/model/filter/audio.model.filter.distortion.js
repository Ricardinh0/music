define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Distortion(params){

    var params = params || {};
    params.mixer = params.mixer || {};

    this.id = params.id || new GUID().getID();
    this.type = 'distortion';
    this.mixer = {
      wetDry: ko.observable(params.mixer.wetDry || 0.5),
      intensity: ko.observable(params.mixer.intensity || 0.5),
      frequency: ko.observable(params.mixer.frequency || 0.0002),
      condition: ko.observable(params.mixer.condition || 'cubed')
    };
  }
  return Distortion;
});