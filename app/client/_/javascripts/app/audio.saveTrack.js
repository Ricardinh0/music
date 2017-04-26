define([
  'knockout',
  'audio.ajax'
], function(ko, ajax){

  var getBufferList = function(data) {
    //
    var arr = [];
    /*
    *   Get all the channels from the track
    */
    for (var i = 0; i < data.module.length; i++) {
      for (var j = 0; j < data.module[i].channel.length; j++) {

        var id = data.module[i].channel[j].id;
        var buffer = data.module[i].channel[j].wavelab.buffer;

        if (buffer && typeof buffer !== 'string') {
          arr.unshift({
            id: id,
            buffer: buffer
          });
        }
      }
    }
    return arr;
  };


  return function(params){
    //
    var model = params.model;
    //
    var bufferList = getBufferList(model);
    //
    var data = ko.mapping.toJSON(model);
    //  Post the track structure to the server
    ajax({
      type: 'POST',
      url: '/track?id=' + model.id(),
      contentType: 'application/json',
      data: data,
      success: function(){
        //
        var res = JSON.parse(this.responseText);
        //
        model.id(res.id);
        //
        if ( bufferList.length ) {
          params.IDB.saveBuffer({
            id: res.id,
            bufferList: bufferList,
            onComplete: function(){
              params.onComplete({
                id: res.id
              });
            }
          });
        } else {
          params.onComplete({
            id: res.id
          });
        }
      }
    });
  }
});