define([
  'knockout',
  'audio.bufferLoader',
  'text!template/filter/reverb'
], function(ko, BufferLoader, Template){

  function Reverb(params){
    
    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    /*
    *   IR .wav files produced by http://fokkie.home.xs4all.nl/IR.htm
    */
    this.list = ko.observableArray([
      {name:'Factory Hall', url:'/samples/reverb/Factory_Hall.wav'},
      {name:'Philips Box Stereo',url:'/samples/reverb/70_s_Philips_box_stereo.wav'},
      {name:'Schellingwoude Church',url:'/samples/reverb/church_schellingwoude.wav'},
      {name:'PA Horn',url:'/samples/reverb/PA_horn_in_hall.wav'}
    ]);
    //
    var loadIR = function(url){
      var self = this;
      var bufferLoader = new BufferLoader({
        context: ctx,
        onComplete: function(buffer){
          convolver.buffer = buffer;
        }
      }).loadBuffer({
        src: url
      });
    };
    /*
    *
    *   Node map
    *
    *                 Convolver     Wet (Route A > Input > Convolver > WetGain > Master)
    *                     o -------- o -
    *                     |          |    \
    *                     |        Mixer    \
    *                     |          |        \
    *       Input  ------ o -------- o -------- o ---- Master node
    *                               Dry (Route B > Input > DryGain > Master)
    *
    */
    //  Create master node
    this.master = ctx.createGain();
    //  Create input node
    this.inputNode = ctx.createGain();
    //  Create convolver
    var convolver = ctx.createConvolver();
    /*
    *
    *   Setup wet/dry at a 50/50 mix
    *
    */
    var wetGain = ctx.createGain();
    wetGain.gain.value = this.model.mixer.wetDry() || 0.5;
    //
    var dryGain = ctx.createGain();
    dryGain.gain.value = ((this.model.mixer.wetDry() || 0.5)-1)*-1;
    // Set up "Route A" (see above)
    this.inputNode.connect(convolver);
    convolver.connect(wetGain);
    wetGain.connect(this.master);
    // Set up "Route B" (see above)
    this.inputNode.connect(dryGain);
    dryGain.connect(this.master);

    //  View template
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
    /*
    * Subscriptions
    */
    this.model.ir.subscribe(function(value){
      loadIR(value.url);
    });
    //
    this.selectDefault = function(option, item){
      if (item.name === self.list()[self.list().length - 1].name) {
        for ( var i = 0; i < self.list().length; i++ ){
          if ( self.model.ir.name === self.list()[i].name) {
            self.ir(self.list()[i]);
          }
        }
      }
    };
    //
    this.model.mixer.wetDry.subscribe(function(value){
      wetGain.gain.value = value;
      dryGain.gain.value = (value-1)*-1;
    });
  }

  return Reverb;
});
