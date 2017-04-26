// var oscillator = ctx.createOscillator();
// oscillator.type = 'square';
// oscillator.frequency.value = 100; // value in hertz
// oscillator.start();
// oscillator.connect(this.master);
//

requirejs.config({
  paths:{
    //  Third party
    'knockout': 'lib/knockout/dist/knockout',
    'mapping': 'lib/bower-knockout-mapping/dist/knockout.mapping.min',
    'text': 'lib/requirejs-text/text',
    'alertify': 'lib/alertify/alertify',
    'recorder': 'lib/recorderjs/recorder',
    'audioBufferToWav': 'lib/audioBufferToWav/index',
    'filesaverjs': 'lib/filesaverjs/FileSaver.min',
    'X2JS': 'lib/x2js/xml2json.min',
    //
    'template': '/template',
    //  Utilities
    'utils.GUID':'utils/utils.GUID',
    'utils.requestAnimationFrame':'utils/utils.requestAnimation',
    'utils.objectWatch':'utils/utils.objectWatch',
    //  Root
    'root':'app/audio.index',
    //  Models
    'audio.model.track':'app/model/audio.model.track',
    'audio.model.module':'app/model/audio.model.module',
    'audio.model.channel':'app/model/audio.model.channel',
    'audio.model.wavelab':'app/model/audio.model.wavelab',
    'audio.model.filter.delay':'app/model/filter/audio.model.filter.delay',
    'audio.model.filter.reverb':'app/model/filter/audio.model.filter.reverb',
    'audio.model.filter.phaser':'app/model/filter/audio.model.filter.phaser',
    'audio.model.filter.flanger':'app/model/filter/audio.model.filter.flanger',
    'audio.model.filter.distortion':'app/model/filter/audio.model.filter.distortion',
    'audio.model.level.gain':'app/model/level/audio.model.level.gain',
    'audio.model.level.bass':'app/model/level/audio.model.level.bass',
    'audio.model.level.middle':'app/model/level/audio.model.level.middle',
    'audio.model.level.treble':'app/model/level/audio.model.level.treble',
    'audio.model.level.stereoPan':'app/model/level/audio.model.level.stereoPan',
    'audio.model.level.playback':'app/model/level/audio.model.level.playback',
    'audio.model.level.LFO':'app/model/level/audio.model.level.LFO',
    //  Mjølnir Drum Machine
    'audio.mjolnir':'app/mjolnir/audio.mjolnir',
    'audio.channel':'app/mjolnir/audio.channel',
    'audio.wavelab':'app/mjolnir/audio.wavelab',
    'audio.wavelabCanvas':'app/mjolnir/audio.wavelabCanvas',
    //  Levels
    'audio.level':'app/level/audio.level',
    'audio.level.gain':'app/level/audio.level.gain',
    'audio.level.bass':'app/level/audio.level.bass',
    'audio.level.middle':'app/level/audio.level.middle',
    'audio.level.treble':'app/level/audio.level.treble',
    'audio.level.stereoPan':'app/level/audio.level.stereoPan',
    'audio.level.playback':'app/level/audio.level.playback',
    //  Filters
    'audio.filter':'app/filter/audio.filter',
    'audio.filter.delay':'app/filter/audio.filter.delay',
    'audio.filter.reverb':'app/filter/audio.filter.reverb',
    'audio.filter.phaser':'app/filter/audio.filter.phaser',
    'audio.filter.flanger':'app/filter/audio.filter.flanger',
    'audio.filter.distortion':'app/filter/audio.filter.distortion',
    //  Base
    'audio.track':'app/audio.track',
    'audio.recycler': 'app/audio.recycler',
    'audio.qwerty': 'app/audio.qwerty',
    'audio.triggerKey': 'app/audio.triggerKey',
    'audio.metronome':'app/audio.metronome',
    'audio.utils':'app/audio.utils',
    'audio.ajax':'app/audio.ajax',
    'audio.saveTrack':'app/audio.saveTrack',
    'audio.deleteTrack':'app/audio.deleteTrack',
    'audio.publisher': 'app/audio.publisher',
    'audio.bufferCanvas': 'app/audio.bufferCanvas',
    'audio.bufferLoader':'app/audio.bufferLoader',
    'audio.bufferPlayer':'app/audio.bufferPlayer',
    'audio.soundbank':'app/audio.soundbank',
    'audio.keyMap':'app/audio.keyMap',
    'audio.keyAction':'app/audio.keyAction',
    'audio.config':'app/audio.config',
    'audio.recorderConfig':'app/audio.recorderConfig',
    'audio.LFO':'app/audio.LFO',
    'audio.watch':'app/audio.watch',
    'audio.IDB':'app/audio.IDB'
  },
  deps: ['knockout', 'mapping'],
  callback: function (ko, mapping) {
      ko.mapping = mapping;
  }
});

requirejs(['root'], function (root) {
  var app = new root();
});