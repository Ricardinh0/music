define([
  'knockout',
  'text!template/qwerty',
  'audio.keyMap'
], function(ko, Template, keyMap){

  function Qwerty(params){
    
    var self = this;
    var params = params || {};
    var getKeyDataArray = function(arr){
      var arr = arr;
      for ( var i = 0; i < arr.length; i++ ) {
        var keyChar = arr[i];
        var obj = {
          active: ko.observable(false),
          keyChar: keyChar,
          keySym: keyMap[keyChar],
          select: self.select,
          onSelected: self.onSelected
        };
        arr[i] = obj;
        self.triggerKey[keyChar] = obj;
      }
      return arr;
    }

    this.triggerKey = {};
    this.onSelected = params.onSelected;
    this.keyRow = [
      ko.observableArray((function(){ 
        return getKeyDataArray([49,50,51,52,53,54,55,56,57,48]) 
      })()),
      ko.observableArray((function(){ 
        return getKeyDataArray([81,87,69,82,84,89,85,73,79,80]) 
      })()),
      ko.observableArray((function(){ 
        return getKeyDataArray([65,83,68,70,71,72,74,75,76]) 
      })()),
      ko.observableArray((function(){ 
        return getKeyDataArray([90,88,67,86,66,78,77]) 
      })())
    ];
  }
  /**
  *
  *   Select
  *
  */
  Qwerty.prototype.select = function(data, e){
    var button = e.target || e.srcElement || {};
    if ( this.onSelected ) {
      this.onSelected(parseInt(button.getAttribute('data-key')));
    }
  };
  /**
  *
  *   Update active buttons
  *
  */
  Qwerty.prototype.update = function(keyChar, action){
    if ( !keyChar ) return false;
    if ( !this.triggerKey[keyChar] ) return false;
    this.triggerKey[keyChar].active( action === 'ACTIVE' ? true : false);
  }
  /**
  *
  *   Template
  *
  */
  Qwerty.prototype.template = function(){
    var qwerty = document.createElement('div');
    qwerty.innerHTML = Template;
    return qwerty;
  };

  return Qwerty;
})