define([

], function(){
  return function(params) {
    var req = new XMLHttpRequest();
    req.open(params.type, params.url, true);
    if ( params.contentType ) {
      req.setRequestHeader('Content-Type', params.contentType);
    }
    req.send(params.data);
    req.addEventListener('load', params.success);
  };
});