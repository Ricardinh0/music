define([
  'recorder',
  'filesaverjs'
], function(){
  
  function RecorderConfig(master){
    return new Recorder(master, {
      workerPath: '/javascripts/workers/recorderWorker.js',
      type: 'audio/wav'
    });
  }

  return RecorderConfig;

});