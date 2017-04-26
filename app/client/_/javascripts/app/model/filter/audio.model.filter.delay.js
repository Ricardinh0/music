define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Delay(params){

    var params = params || {};
    params.mixer = params.mixer || {};

    this.id = params.id || new GUID().getID();
    this.type = 'delay';
    this.mixer = {
      delay: ko.observable(params.mixer.delay || 0.5),
      feedback: ko.observable(params.mixer.feedback || 0.8),
      filter: ko.observable(params.mixer.filter || 1000)
    };
  }
  return Delay;
});