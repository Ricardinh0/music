define([

], function(){

  return function() {

    var triggerKey = {};

    var addKey = function(keyChar, id){
      triggerKey[keyChar] = id;
      return triggerKey;
    }

    var deleteKey = function(keyChar){
      delete triggerKey[keyChar];
      return triggerKey
    }

    var getKey = function(keyChar){
      return triggerKey[keyChar] || false;
    }

    return {
      getKey: getKey,
      addKey: addKey,
      deleteKey: deleteKey
    }
  }

});