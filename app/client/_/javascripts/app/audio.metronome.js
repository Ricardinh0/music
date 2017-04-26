define([
  'knockout',
  'audio.config',
  'utils.requestAnimationFrame'
],function(ko, config, requestAnimationFrame){

  function Metronome(param){
    /*
    * Static variables
    */
    var self = this;
    var seconds = 60;
    var ctx = param.ctx || null;
    var beatCount = param.beatCount || config.beatCount;
    var ratioArray = param.ratio || config.ratio;
    var schedule = {};
    var loopEvent = [];
    var tickEvent = [];
    /*
    * Public
    */
    this.bpm = ko.observable(param.bpm || 100);
    this.onTick = param.onTick || null;
    this.isPlaying = false;
    this.postTick = false;
    /*
    * Static Functions
    */
    //  The length (in seconds) of a loop of 64 beats at set the BPM
    var getLoopDuration = function(ratio){
      //  Return
      return ratio * ( seconds / self.bpm() );
    };
    //  The interval needed to fit a beat ratio within the specified beatCount
    var getInterval = function(ratio){
      //  Return
      return getLoopDuration( ratio ) / 64;
    };
    //  The baseline schedule for a specified ratio
    var getSchedule = function(){
      //  Set interval
      var timeStamp = ctx.currentTime;
      var schedule = {};
      //
      for(var i = 0; i < ratioArray.length; i++){
        //
        var interval = getInterval(ratioArray[i]);
        //
        schedule[ratioArray[i]] = {
          time: [
            timeStamp,
            timeStamp + interval,
            timeStamp + (interval*2)
          ],
          beat: 15,
          interval: interval
        };
      }
      //  Return
      return schedule;
    };
    //  Update a schedule
    var updateSchedule = function(obj, ratio){
      //  Set schedule
      var schedule = obj;
      //  Remove the first interval of specified ratio
      schedule.time.shift();
      //  And push on to the end a new interval to schedule
      schedule.time.push( schedule.time[1] + schedule.interval );
      //  Update the beatCount for this ratio
      schedule.beat = (schedule.beat+1) < beatCount ? schedule.beat + 1 : 0;
      // If ratio 4 updated
      if ( ratio === 4 ) {
        this.postTick = true;
      }
      //
      return schedule;
    };
    //  Tick function
    var tick = function(){
      //  If the loop is playing
      if(self.isPlaying){
        //  If callback exists and tick should be posted
        if( this.postTick ) {
          //  Post
          for(var i = 0; i < tickEvent.length; i++){
            tickEvent[i].callback.call(this, { schedule: schedule });
          }
          //
          if ( loopEvent.length ) {
            if ( ctx.currentTime >= loopEvent[0].loopEnd ) {
              loopEvent[0].callback(loopEvent[0].loopDuration);
            }
          }
          //  Tick posted
          this.postTick = false;
        }
        //  Set a timeStamp for the current time of the audio clock
        var timeStamp = ctx.currentTime;
        //
        for(var i = 0; i < ratioArray.length; i++){
          var ratio = ratioArray[i];
          //  If this timeStamp is greater than the first interval for this ratio
          if (timeStamp > schedule[ratio].time[0]) {
            //  Update this schedule
            schedule[ratio] = updateSchedule( schedule[ratio], ratio );
          }
        }
        //  Rerun loop
        requestAnimationFrame(tick);
      }
    };
    /*
    * Loop event
    */
    this.addLoopEvent = function(loopRatio, callback){
      //  Get the loop duration (always returns 64 beat loop at the given ratio 4,8,16,32,64)
      var loopDuration = getLoopDuration(loopRatio);
      //  Add the 1/4 of the duration on the end to create a "clean" loop
      loopDuration += ( loopDuration / 4 );
      //  Set the timeStamp for when the loop should stop
      var loopEnd = ctx.currentTime + loopDuration;
      //  Add event
      loopEvent.push({
        callback: callback,
        loopEnd: loopEnd,
        loopDuration: loopDuration
      });
      //  Play track
      self.playToggle();
    };
    /*
    *
    */
    this.removeLoopEvent = function(callback){
      //  Remove event
      loopEvent.shift();
      //  Stop track
      self.playToggle();
    };
    //
    this.addTickEvent = function(type, callback){
      tickEvent.push({
        type:type,
        callback:callback
      });
    }
    this.removeTickEvent = function(type){
      for (var i = 0; i < tickEvent.length; i++) {
        if(tickEvent[i].type===type){
          tickEvent.splice(i,1);
        }
      }
    }
    this.clearTickEvent = function(type){
      tickEvent = [];
    }
    /*
    * Subscriptions
    */
    this.bpm.subscribe(function(value){
      schedule = getSchedule();
    });
    /*
    * Public functions
    */
    this.playToggle = function(){
      //  If the loop isn't playing
      if (!self.isPlaying) {
        //  Set play state
        self.isPlaying = true;
        //  Set schedule before starting
        schedule = getSchedule();
        //  Run loop
        requestAnimationFrame(tick);
      } else {
        //  Set play set
        self.isPlaying = false;
      }
    };
    /*
    * Public functions
    */
    this.stop = function(){
      //  If the loop isn't playing
      if (self.isPlaying) {
        //  Set play set
        self.isPlaying = false;
      }
    };
  }
  //
  return Metronome;
});