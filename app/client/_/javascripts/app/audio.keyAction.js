define([
  'knockout'
],function(ko){

  function KeyAction(params){
    
    var self = this;

    this.block = ko.observable(false);
    this.action = [];

    this.toggleBlock = function(){
      self.block(!self.block());
    };

    var trigger = function(keyChar, keyType, eventType){
      for ( var i = 0; i < self.action.length; i++ ) {
        if ( self.action[i].keyType === keyType &&  self.action[i].eventType === eventType ) {
          self.action[i].callback(keyChar);
        }
      }
    }

    window.addEventListener('keyup', function(e){
      if ( self.block() ) return;
      e = self.whichKey(e);
      if ( e.which >= 48 && e.which <= 90) {
        trigger(e.which, 'KEY', 'UP');
      } else if ( e.which === 13 ) {
        trigger(e.which, 'ENTER', 'UP');
        e.preventDefault();
      } else if ( e.which === 32 ) {
        trigger(e.which, 'SPACE', 'UP');
        e.preventDefault();
      }
    });

    window.addEventListener('keydown', function(e){
      if ( self.block() ) return;
      e = self.whichKey(e);
      if ( e.which >= 48 && e.which <= 90) {
        trigger(e.which, 'KEY', 'DOWN');
      } else if ( e.which === 13 ) {
        trigger(e.which, 'ENTER', 'DOWN');
        e.preventDefault();
      } else if ( e.which === 32 ) {
        trigger(e.which, 'SPACE', 'DOWN');
        e.preventDefault();
      }
    });

  }
  /**
  *
  * Which key
  *
  */
  KeyAction.prototype.add = function(params){
    this.action.push({
      keyType: params.keyType,
      eventType: params.eventType,
      callback: params.callback
    })
  };
  /**
  *
  * Which key
  *
  */
  KeyAction.prototype.clear = function(params){
    this.action = [];
  };
  /**
  *
  * Which key
  *
  */
  KeyAction.prototype.whichKey = function(e){
    if ( e.which === null && (e.charCode !== null || e.keyCode !== null) ) {
      e.which = e.charCode !== null ? e.charCode : e.keyCode;
    }
    return e;
  };

  return KeyAction;
})