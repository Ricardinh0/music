define([
  'knockout',
  'audio.level.gain',
  'audio.level.bass',
  'audio.level.middle',
  'audio.level.treble',
  'audio.level.stereoPan'
], function(ko, Gain, Bass, Middle, Treble, StereoPan){

  function Level(params){
    //
    var self = this;
    /*
    * Set level type
    */
    if(params.type==='gain'){

      Gain.call(this, params);

    } else if (params.type==='bass') {

      Bass.call(this, params);

    } else if (params.type==='middle') {

      Middle.call(this, params);

    } else if (params.type==='treble') {

      Treble.call(this, params);

    } else if (params.type==='stereoPan') {

      StereoPan.call(this, params);

    }
    
  }

  return Level;
});
