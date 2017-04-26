define([

], function(){

  var config = {

    bpm: 100,

    beatCount: 16,

    ratio: [4,8,16,32,64],

    filterList: [
      'delay', 
      'reverb',
      'phaser',
      'flanger',
      'distortion'
    ],

    levelList: [
      {type: 'gain'}, 
      {type: 'bass'}, 
      {type: 'middle'}, 
      {type: 'treble'}, 
      {type: 'stereoPan'}
    ],

    canvas: {

      metronome: {
        pip:        '#EEE'
      },

      buffer: {
        wave:       '#333',
        chunk:      'rgba(0, 0, 0, 0.2)',
        width:      600
      }

    }

  };

  return config;

});