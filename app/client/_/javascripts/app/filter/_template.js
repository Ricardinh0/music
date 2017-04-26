define([
  'knockout',
  'text!/template/filter/phaser'
], function(ko, Template){

  function Phaser(params){

    var self = this;
    var ctx = params.ctx;
    //
    this.model = params.model;
    //  Create master node
    this.master = ctx.createGain();
    //  Create input node
    this.inputNode = ctx.createGain();
    //
    this.inputNode.connect(this.master);
    //  View template
    this.template = function(){
      var template = document.createElement('div');
      template.innerHTML = Template;
      return template;
    };
  }

  return Phaser;
});