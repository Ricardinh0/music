define([
  'knockout',
  'alertify',
  'audio.ajax'
], function(ko, alertify, ajax){

  return function(params){
    //
    var model = params.model;
    //
    if ( model.id() === undefined ) return false;
    //
    alertify.confirm('Are you sure you want to delete this track?', function () {
      ajax({
        type: 'POST',
        url: '/track'+'?id=' + model.id() + '&delete=true',
        contentType: 'application/json',
        data: '',
        success: function(){
          var res = JSON.parse(this.responseText);
          params.onComplete();
        }
      });
    });
  }

});