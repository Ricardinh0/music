define([
  'knockout',
  'text!template/level/gain',
  'audio.LFO'
], function(ko, Template, LFO){

  return function (params) {
    //
    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    /*
    * Create node
    */
    this.inputNode = ctx.createGain();
    this.inputNode.gain.value = parseFloat(this.model.level());
    /*
    * Subscriptions
    */
    this.model.level.subscribe(function(value){
      self.inputNode.gain.value = value;
    });
    //  Add LFO
    LFO.call(this, this.model);
    /*
    * Template
    */
    this.template = function(){
      //  Create template wrap
      var template = document.createElement('div');
      //  Set the inner HTML to the current partial
      template.innerHTML = Template;
      //  Return template
      return template;
    };
  };
});