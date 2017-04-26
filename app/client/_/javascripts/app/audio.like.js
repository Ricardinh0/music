define([
  'knockout',
  'audio.ajax'
], function(){

  function Like(params){
    var params = params || {};
    this.id = params.id;
    this.status = ko.observable(params.status);
    this.count = ko.observable(parseInt(params.count) || 0);
  }

  Like.prototype.toggle = function(e, data){

    var self = this;

    ajax({
      type: 'POST',
      url: '/like?status=' + !self.status(),
      contentType: 'application/json',
      data: JSON.stringify({
        publishId: self.id
      }),
      success: function(){
        var res = JSON.parse(this.responseText);
        if ( res.liked ){
          self.status(true);
          self.count(self.count()+1);
        } else {
          self.status(false);
          if (self.count()) {
            self.count(self.count()-1);
          }
        }
      }
    });
  };

  return Like;
});