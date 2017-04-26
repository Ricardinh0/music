define([
  'knockout',
  'audio.filter.delay',
  'audio.filter.reverb',
  'audio.filter.phaser',
  'audio.filter.flanger',
  'audio.filter.distortion'
], function(ko, Delay, Reverb, Phaser, Flanger, Distortion){

  function Filter(params){
    /*
    * Variables
    */
    var type = params.type.toLowerCase();
    //
    this.mixer = {};
    /*
    * Setup
    */
    if(type==='delay'){

      Delay.call(this, params);

    } else if(type==='reverb'){

      Reverb.call(this, params);

    } else if(type==='phaser'){

      Phaser.call(this, params);

    } else if(type==='flanger'){
      
      Flanger.call(this, params);

    } else if(type==='distortion'){
      
      Distortion.call(this, params);

    }
    
  }

  Filter.prototype.get = function(){
    return {};
  };

  return Filter;

});