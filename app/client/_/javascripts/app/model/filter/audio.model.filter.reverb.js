define([
  'knockout',
  'utils.GUID'
], function(ko, GUID){
  function Reverb(params){

    var params = params || {};
    params.mixer = params.mixer || {};

    this.id = params.id || new GUID().getID();
    this.type = 'reverb';
    this.mixer = {
      wetDry: ko.observable(params.mixer.wetDry || 0.5)
    };
    this.ir = ko.observable({});

  }
  return Reverb;
});