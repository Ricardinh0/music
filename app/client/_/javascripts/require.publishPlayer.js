
requirejs.config({
  paths:{
    //  Third party
    'knockout': 'lib/knockout/dist/knockout',
    'audio.publishPlayer':'app/audio.publishPlayer',
    'audio.bufferLoader':'app/audio.bufferLoader',
    'audio.bufferPlayer':'app/audio.bufferPlayer',
    'audio.like':'app/audio.like',
    'audio.ajax':'app/audio.ajax'
  },
  deps: ['knockout']
});

requirejs(['audio.publishPlayer'], function (PublishPlayer) {
  var app = new PublishPlayer();
});