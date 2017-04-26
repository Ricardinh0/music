define([
  'knockout',
  'text!template/filter/delay'
], function(ko, Template){

  function Delay(params){

    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    /*
    *
    *   Node map
    *
    *           Feedback    Filter
    *                 o --- o
    *                   \ /    (Route A > Delay > Feedback > Filter > Delay)
    *                  Delay
    *                    o    (Route B > Input > Delay > master)
    *                   / \
    *      Input ---- o  -  o --- Master node
    *                (Route C > Input > Master)
    *
    */
    //  Create master node
    this.master = ctx.createGain();
    //  Create master node
    this.inputNode = ctx.createGain();
    //  Create master node
    var delay = ctx.createDelay();
    delay.delayTime.value = this.model.mixer.delay();
    //
    var feedback = ctx.createGain();
    feedback.gain.value = this.model.mixer.feedback();
    //
    var filter = ctx.createBiquadFilter();
    filter.frequency.value = this.model.mixer.filter();

    // Set up "Route A" (see above)
    delay.connect(feedback);
    feedback.connect(filter);
    filter.connect(delay);
    // Set up "Route B" (see above)
    this.inputNode.connect(delay);
    delay.connect(this.master);
    // Set up "Route C" (see above)
    this.inputNode.connect(this.master);
    //
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
    /*
    * Subscriptions
    */
    this.model.mixer.delay.subscribe(function(value){
      delay.delayTime.value = parseFloat(value);
    });
    this.model.mixer.feedback.subscribe(function(value){
      feedback.gain.value = parseFloat(value);
    });
    this.model.mixer.filter.subscribe(function(value){
      filter.frequency.value = parseFloat(value);
    });
  }

  return Delay;
});