define([
  'knockout',
  'text!template/level/stereopan',
  'audio.LFO',
], function(ko, Template, LFO){

  function StereoPan(params){
    //
    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //
    this.inputNode = ctx.createStereoPanner();
    this.inputNode.pan.value = parseFloat(this.model.level());
    /*
    * Observables
    */
    this.model.level.subscribe(function(value){
      self.inputNode.pan.value = value;
    });
    /*
    * 
    */
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
  }

  return StereoPan;
});