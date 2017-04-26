define([
  'knockout',
  'text!template/filter/flanger'
], function(ko, Template){
  

  function LFO(params){
    var params = params || {};
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
      return {
        y: getSine(i)
      };
    };
    var set = function(wave){
      if ( !wave ) return;
      amplitude = wave.amplitude || amplitude;
      frequency = wave.frequency || frequency;
      x = wave.x || x;
      y = wave.y || y;
    };
    //
    var getSine = function(i){
      return amplitude * Math.sin( frequency * ( (radian*i) - x ) ) + y;
    };
    //
    return {
      get: get,
      set: set
    }
  }


  function Flanger(params){

    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //  Create master node
    this.master = ctx.createGain();
    //  Create input node
    this.inputNode = ctx.createGain();
    //
    var modulation = new LFO({
      amplitude: this.model.mixer.intensity(),
      frequency: this.model.mixer.frequency(),
      x: 0,
      y: 0
    });

    var wetGain = ctx.createGain();
    wetGain.gain.value = parseFloat(this.model.mixer.wetDry());

    var dryGain = ctx.createGain();
    dryGain.gain.value = parseFloat((this.model.mixer.wetDry()-1)*-1);

    var delay = ctx.createDelay(0.01);
    delay.delayTime.value = this.model.mixer.delay();

    var feedback = ctx.createGain();
    feedback.gain.value = this.model.mixer.feedback();

    var highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = parseFloat(10000 + (this.model.mixer.filter()-1)*-1);

    var lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = parseFloat(this.model.mixer.filter());
    //
    //
    this.model.mixer.wetDry.subscribe(function(value){
      wetGain.gain.value = parseFloat(value);
      dryGain.gain.value = parseFloat((value-1)*-1);
    });

    this.model.mixer.delay.subscribe(function(value){
      delay.delayTime.value = parseFloat(value);
    });

    this.model.mixer.feedback.subscribe(function(value){
      feedback.gain.value = parseFloat(value);
    });

    this.model.mixer.filter.subscribe(function(value){
      lowpass.frequency.value = parseFloat(10000 + (value-1)*-1);
      highpass.frequency.value = parseFloat(value);
    });

    this.model.mixer.intensity.subscribe(function(value){
      modulation.set({
        amplitude: parseFloat(value)
      });
    });

    this.model.mixer.frequency.subscribe(function(value){
      modulation.set({
        frequency: parseFloat(value)
      });
    });
    //
    // Set up "Route A" (see above)
    delay.connect(feedback);
    feedback.connect(delay);
    // Set up "Route B" (see above)
    this.inputNode.connect(highpass);
    this.inputNode.connect(lowpass);
    highpass.connect(delay);
    lowpass.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(this.master);
    //
    this.inputNode.connect(dryGain);
    dryGain.connect(this.master);

    this.setLFO = function(){
      var signal = (modulation.get().y / 1000) + delay.delayTime.value;
      if ( signal <= 0 ) signal = 0;
      if ( signal >= 0.01 ) signal = 0.01;
      delay.delayTime.value = signal;
    }

    //  View template
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
  }

  return Flanger;
});