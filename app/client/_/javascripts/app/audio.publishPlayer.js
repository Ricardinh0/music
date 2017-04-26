define([
  'knockout',
  'audio.bufferPlayer',
  'audio.like'
], function(ko, BufferPlayer, Like){
  /**
  *
  *   Setup AudioContext
  *
  */
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
  /*
  *
  *
  *
  */
  function PublishPlayer(){

    var view = document.querySelectorAll('#publishList')[0];
    var self = this;
    var ctx = new AudioContext();
    var master = ctx.createGain();
    var bufferPlayer = new BufferPlayer({ ctx: ctx });

    var PL = window.publishList || [];
    
    PL.map(function(obj){
      obj.username = obj.username ? obj.username : '';
      // obj.like = new Like({
      //   id: obj._id,
      //   count: obj.count,
      //   status: obj.status
      // });
      return obj;
    });

    this.publishList = ko.observableArray(PL);

    console.log(this.publishList());

    ko.applyBindings(this, view);

  }

  return PublishPlayer;
});