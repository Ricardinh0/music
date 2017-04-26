define([
  'knockout',
  'text!template/level/bass',
], function(ko, Template){

  function Bass(params){
    //
    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //
    this.inputNode = ctx.createBiquadFilter();
    this.inputNode.type = 'highshelf';
    this.inputNode.frequency.value = parseFloat(this.model.level());
    this.inputNode.gain.value = 25;

    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
    /*
    * Observables
    */
    this.model.level.subscribe(function(value){
      self.inputNode.frequency.value = value;
    });
  }

  return Bass;
})