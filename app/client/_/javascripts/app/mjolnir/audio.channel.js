define([
  'knockout',
  'mapping',
  'text!template/channel',
  'audio.config',
  'audio.level',
  'audio.filter',
  'audio.keyMap',
  'audio.wavelab'
],function(ko, mapping, template, config, Level, Filter, KeyMap, Wavelab){

  function Channel(params){
    //
    var self = this;
    //
    this.model = params.model;
    //
    this.ctx = params.ctx;
    this.master = this.ctx.createGain();
    this.master.connect(params.master);
    /*
    *
    *
    *
    */
    this.sampleName = ko.observable('');
    this.active = ko.observable(true);
    this.lastScheduled = undefined;
    this.keyLetter = KeyMap[this.model.keyChar];
    /*
    * Wavelab
    */
    this.wavelab = new Wavelab({ 
      ctx: this.ctx,
      model: this.model.wavelab,
      soundbank: params.soundbank
    });
    /*
    * Levels
    */
    this.level = ko.observableArray([]);
    var level = this.model.level;
    for(var i = 0; i < level.length; i++) {
      this.level.push(this.createLevel(level[i]));
    }
    this.connectLevel();
    /*
    * Filters
    */
    this.filter = ko.observableArray([]);
    this.filterList = config.filterList;
    this.filterSelect = ko.observable();
    this.filterSelect.subscribe( function(value){
      if ( value !== undefined ) {
        self.disconnectFilter();
        self.filter.push(self.createFilter(self.model.createFilter({
          type: value
        })));
        self.connectFilter();
      }
    });

    var filter = this.model.filter;
    for(var i = 0; i < filter.length; i++) {
      this.disconnectFilter();
      this.filter.push(this.createFilter(filter[i]));
      this.connectFilter();
    }
    /*
    * Ratio
    */
    this.ratioList = config.ratio;
    this.ratioSelect = ko.observable(this.model.ratio);
    this.ratioSelect.subscribe( function(value){
      self.model.ratio = value;
    });
    //
    //
    //
    //
    //
    // var oscillator = this.ctx.createOscillator();
    // oscillator.type = 'square';
    // oscillator.frequency.value = 100; // value in hertz
    // var inputNode = this.level()[this.level().length-1].inputNode;
    

    // oscillator.start();
    // setInterval(function(){
    //   oscillator.connect(inputNode);
    //   setTimeout(function(){
    //     oscillator.disconnect();
    //   }, 200);
    // }, 1000);
  }


  Channel.prototype.template = function(){
    var channelWrap = document.createElement('div');
    channelWrap.innerHTML = template;
    return channelWrap;
  };

  Channel.prototype.mute = function(){
    if (!this.model.isMuted()) {
      if (this.filter().length) {
        this.filter()[0].master.disconnect();
      } else {
        this.level()[0].inputNode.disconnect();
      }
      this.model.isMuted(true);
    } else {
      if (this.filter().length) {
        this.filter()[0].master.connect(this.master);
      } else {
        this.level()[0].inputNode.connect(this.master);
      }
      this.model.isMuted(false);
    }
  };

  Channel.prototype.show = function(){
    if (!this.active()) {
      this.active(true);
    } else {
      this.active(false);
    }
  };

  Channel.prototype.createLevel = function(model) {
    //  Add everything
    var level = new Level({
      type: model.type,
      ctx: this.ctx,
      model: model
    });
    //
    return level
  };

  Channel.prototype.connectLevel = function(){
    //  Connect everything
    for(var i = 0; i < this.level().length; i++) {
      if (i > 0){
        this.level()[i].inputNode.connect(this.level()[i-1].inputNode);
      } else {
        this.level()[i].inputNode.connect(this.master);
      }
    }
  }

  Channel.prototype.createFilter = function(model) {
    //
    var filter = new Filter({
      ctx: this.ctx,
      type: model.type,
      model: model
    });
    //
    return filter;
  };

  Channel.prototype.removeFilter = function(id){
    //  Disconnect all filters
    this.disconnectFilter();
    //  Find filter to remove
    for(var i = 0; i < this.filter().length; i++) {
      //  If id === id
      if (this.filter()[i].model.id === id) {
        //  Remove this filter
        this.filter.splice(i, 1);
        //  Remove model
        this.model.filter.splice(i, 1);
        //  Break the loop
        break;
      }
    }
    //  Connect all filters
    this.connectFilter();
  };

  Channel.prototype.disconnectFilter = function(){
    //  Disconnect everything
    for(var i = 0; i < this.filter().length; i++) {
      //  Disconnect
      this.filter()[i].master.disconnect();
    }
    //  And disconnect the first level from the filter chain
    this.level()[0].inputNode.disconnect();
  };

  Channel.prototype.connectFilter = function(){
    var filterCount = this.filter().length;
    //  If there are filters to connect
    if (filterCount) {
      //  If the there are more than 1
      if (filterCount > 1) {
        //  Reconnect everything
        for(var i = 0; i < filterCount; i++) {
          //  If the first filter
          if (!i) {
            //  Connect this to the master
            this.filter()[i].master.connect(this.master);
          } else {
            //  Connect this filter to the inputNode of the filter prior to it in the stack
            this.filter()[i].master.connect(this.filter()[i-1].inputNode);
          }
        }
        //  Then reconnect the first level in the level chain to the last filter in the filter chain
        this.level()[0].inputNode.connect(this.filter()[filterCount-1].inputNode);
        //
      } else {
        //  Connect the sole filter to master
        this.filter()[0].master.connect(this.master);
        //  And the reconnect the first level in the level chain to that filter
        this.level()[0].inputNode.connect(this.filter()[0].inputNode);
      }
    } else {
      //  If there are no filters, default back to the first level to connec to master
      this.level()[0].inputNode.connect(this.master);
    }
  };

  Channel.prototype.play = function(schedule){
    if ( this.wavelab.hasBuffer() && !this.model.isMuted() ) {
      var self = this;
      var sound = this.ctx.createBufferSource();
      var levelCount = this.level().length;
      var filterCount = this.filter().length;
      var inputNode = null;
      //  Set buffer
      sound.buffer = this.wavelab.getBuffer();
      //  Set play back rate
      sound.playbackRate.value = this.wavelab.getPlayback();
      // connect the buffer to the inputNode of last level in the stack
      inputNode = this.level()[levelCount-1].inputNode;
      //
      sound.connect(inputNode);
      //
      if(schedule){
        sound.start(schedule);
      } else {
        sound.start();
      }
    }
  };

  Channel.prototype.punch = function(param){
    //
    var param = param || {};
    var data = param.data;
    //
    if (data){
      //  Check the LFO setting for each level
      for(var i = 0; i < this.level().length; i++){
        //
        var level = this.level()[i];
        //   If the LFO defined
        if ( level.model.LFO !== undefined ) {
          //  If the LFO is on
          //  TODO: Remove this check and just set LFO anyway. Move the "use" check to the controller
          if ( level.model.LFO.useLFO() ) {
            //  Set the level using it's LFO settings
            level.setLFO();
          }
        }
      }
      //  Check the LFO setting for each filter
      for(var i = 0; i < this.filter().length; i++){
        //
        var filter = this.filter()[i];
        //   If the LFO defined
        if ( filter.setLFO !== undefined && typeof filter.setLFO === 'function' ) {
          //  Set the level using it's LFO settings
          filter.setLFO();
        }
      }
      //
      // if (this.playback.model.LFO.useLFO()) {
      //   this.playback.setLFO();
      // }
      //
      //console.log(data.schedule[ this.ratio ].beat);
      if (this.model.step()[data.schedule[ this.model.ratio ].beat].on) {
        if( this.lastScheduled !== data.schedule[ this.model.ratio ].time['2'] ){
          if ( this.wavelab.hasBuffer() ) {
            this.play(data.schedule[ this.model.ratio ].time['0']);
          }
          this.lastScheduled = data.schedule[ this.model.ratio ].time['2'];
        }
      }
    } else {
      this.play();
    }
  };

  return Channel;

});