define([
  'knockout'
], function(ko){

  function LFO(params){
    //
    var params = params || {};
    var config = params.LFO || {};
    //
    this.LFO = {
      useLFO: ko.observable( config.useLFO || false ),
      frequency: ko.observable( config.frequency || 0 ),
      amplitude: ko.observable( config.amplitude || 0 ),
      x: ko.observable( config.x || 0 ),
      y: ko.observable( config.y || 0 )
    }
  }

  return LFO;

});