define([
  'knockout',
  'text!template/filter/distortion'
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
    var condition = 'cubed';
    //
    var canvas = document.createElement('canvas');
    canvas.height = 200;
    canvas.width = 200;
    //
    var ctx = canvas.getContext('2d');
    //
    var set = function(wave){
      if ( !wave ) return;
      amplitude = wave.amplitude || amplitude;
      frequency = wave.frequency || frequency;
      x = wave.x || x;
      y = wave.y || y;
      condition = wave.condition || condition
      paint();
    };
    //
    var get = function(i, factor){
      if (factor) {
        return yFunction(amplitude * Math.sin( (frequency*factor) * ( (radian*i) - x ) ) + y);
      } else {
        return yFunction(amplitude * Math.sin( frequency * ( (radian*i) - x ) ) + y);
      }
    };
    //
    var yFunction = function(y){

      if ( condition === 'cubed' ){
        y = y*y*y;
      } else if ( condition === 'x4' ) {
        y = y*y*y*y;
      } else if ( condition === 'hardclip' ) {
        if ( y >= 0.3 ) y = 0.3;
        if ( y <= -0.3 ) y = -0.3; 
      } else if ( condition === 'atan' ) {
        y = Math.atan(y);
      }

      return y;
    };
    //
    var paint = function(){
      var position = {};
      var width = canvas.width;
      var height = canvas.height;
      ctx.clearRect( 0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle="#FF0000";
      for(var i = 0; i < width; i++) {
        var y = get(i, 100);
        if (!i) {
          ctx.moveTo( i , y * height + (height/2));
        } else {
          ctx.lineTo( i , y * height + (height/2));
        }
      }
      ctx.stroke();
    };
    //
    return {
      get: get,
      set: set,
      getCanvas: function(){
        return canvas;
      },
    }
  }

  function Distortion(params){

    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //  Create master node
    this.master = ctx.createGain();
    //  Create input node
    this.inputNode = ctx.createGain();
    //
    var modulation = new LFO();
    var distortion = ctx.createWaveShaper();
    var dry = ctx.createGain();
    var wet = ctx.createGain();

    this.list = ko.observableArray([
      {name:'Cubed', type:'cubed'},
      {name:'x4', type:'x4'},
      {name:'Hardclip', type:'hardclip'},
      {name:'Atan', type:'atan'}
    ]);

    modulation.set({
      amplitude: this.model.mixer.intensity(),
      frequency: this.model.mixer.frequency(),
      x: 0,
      y: 0
    });
    //

    var curve = function(){
      var sampleCount = 44100;
      var curve = new Float32Array(sampleCount);
      var x = null;
      for (var i = 0 ; i < sampleCount; ++i ) {
        var y = modulation.get(i);
        curve[i] = y;
      }
      return curve;
    }
    //
    distortion.curve = curve();
    distortion.oversample = '4x';
    //
    this.inputNode.connect(distortion);
    distortion.connect(wet);
    wet.connect(this.master)
    //
    this.inputNode.connect(dry);
    dry.connect(this.master)


    this.model.mixer.wetDry.subscribe(function(value){
      wet.gain.value = parseFloat(value);
      dry.gain.value = parseFloat((value-1)*-1);
    });

    this.model.mixer.condition.subscribe(function(value){
      modulation.set({
        condition: value.type
      });
      distortion.curve = curve();
    });

    this.model.mixer.intensity.subscribe(function(value){
      modulation.set({
        amplitude: parseFloat(value)
      });
      distortion.curve = curve();
    });

    this.model.mixer.frequency.subscribe(function(value){
      modulation.set({
        frequency: parseFloat(value)
      });
      distortion.curve = curve();
    });

    //  View template
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      template.appendChild(modulation.getCanvas());
      return template;
    };
  }

  return Distortion;
});