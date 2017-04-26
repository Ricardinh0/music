define([
  'knockout',
  'utils.GUID',
  'audio.model.channel'
], function(ko, GUID, Channel){

  function Module(params){

    this.id = params.id || new GUID().getID();
    this.type = params.type || 'mjolnir';
    /*
    *
    */
    this.channel = params.channel ? (function(){
      var arr = [];
      for ( var i = 0; i < params.channel.length; i++ ) {
        arr.push(new Channel(params.channel[i]));
      }
      return arr;
    })() : [];
    //
  };

  Module.prototype.createChannel = function(params){
    var params = params || {};
    var channel = new Channel(params);
    this.channel.push(channel);
    return channel;
  };

  return Module;
})