define([
  'knockout'
], function(ko){
  return function Watch(obj){
    obj.hasChange = false;
    obj.change = function(){
      //console.log(arguments);
      obj.hasChange = true;
    }
    for ( var key in obj ){
      if (ko.isObservable(obj[key])) {
        obj[key].subscribe(obj.change);
      } else if (typeof obj[key] !== 'function') {
        obj.watch('key', obj.change);
      }
    }
  };
});