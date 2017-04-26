define([
  'knockout',
  'text!template/level/treble',
], function(ko, Template){

  function Treble(params){
    //
    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //
    this.inputNode = ctx.createGain();

    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
    /*
    * Observables
    */
    this.model.level.subscribe(function(value){
      self.inputNode.gain.value = value;
    });
  }

  return Treble;
})