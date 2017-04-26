define([
  'knockout',
  'text!template/filter/phaser'
], function(ko, Template){

  function Worker(params){
    //  PI
    var PI = 3.14159;
    //  Expand Vertically
    var amplitude = params.amplitude || 0;
    //  Shrink horizontally
    var frequency = params.frequency || 0;
    //  X phase
    var x = params.x || 0;
    //  Y Phase
    var y = params.y || 0;
    //  The ∆ of a beat at 4 beats per bar
    var radian = 2*PI;
    //
    var i = 0;
    //
    var get = function(){
      i++;
      return amplitude * Math.sin( frequency * ( (radian*i) - x ) ) + y;
    };
    //
    var set = function(params){
      frequency = params.frequency;
    }
    //
    return {
      get: get,
      set: set
    };
  }

  function Phaser(params){
    //
    this.model = params.model;
    //
    var self = this;
    var ctx = params.ctx;
    var output = ko.observable();
    var frequency = this.model.mixer.frequency;
    var phase = this.model.mixer.phase;
    
    var LFO = new Worker({
      frequency : frequency(),
      amplitude : 1,
      x : 0,
      y : 0
    });


    //  Create master node
    this.master = ctx.createGain();
    //  Create input node
    this.inputNode = ctx.createGain();
    //
    var allpassCount = 8;
    var allpass = [];
    for ( var i = 0; i < allpassCount; i++ ) {
      var biquadFilter = ctx.createBiquadFilter();
      biquadFilter.type = 'allpass';
      biquadFilter.frequency.value = 1000 * i;
      allpass.push(biquadFilter);
    }
    //
    this.inputNode.connect(allpass[0]);
    for ( var i = 0; i < allpass.length; i++ ) {
      if ( allpass[i+1] !== undefined ) {
        allpass[i].connect(allpass[i+1]);
      } else {
        allpass[i].connect(this.master);
      }
    }
    this.inputNode.connect(this.master);
    //


    this.setLFO = function(){
      output((LFO.get() * 1000) + parseInt(phase()));
    }

    frequency.subscribe(function(value){
      LFO.set({frequency: value})
    });

    output.subscribe(function(value){
      for ( var i = 0; i < allpass.length; i++ ) {
        allpass[i].frequency.value = value * (i+1);
      }
    })

    //  View template
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
  }

  return Phaser;
});