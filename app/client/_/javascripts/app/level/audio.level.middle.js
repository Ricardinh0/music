define([
  'knockout',
  'text!template/level/middle',
], function(ko, Template){

  function Middle(params){
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

  return Middle;
})