define([
  'knockout'
], function(ko){

  function Worker(params){
    //
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    //  PI
    var PI = 3.14159;
    //  Expand Vertically
    var a = params.amplitude || 0.05;
    //  Shrink horizontally
    var b = params.frequency || 0.05;
    //  X phase
    var c = params.x || 0;
    //  Y Phase
    var d = params.y || 0;
    //  The ∆ of a beat at 4 beats per bar
    var radian = 2*PI;
    //
    var count = 0;

    var set = function(wave){
      if ( wave === undefined ) return false;
      
      a = wave.amplitude || a;
      b = wave.frequency || b;
      c = wave.x || c;
      d = wave.y || d;

      console.log(a,b,c,d);

      paintGUI();
      
    };

    var get = function(){
      count++;
      return {
        x: radian*count,
        y: getSine(count)
      };
    };

    var getSine = function(i){
      return a * Math.sin( b * ( (radian*i) - c ) ) + d;
    };

    var getGUI = function(){
      canvas.width = 200;
      canvas.height = 200;
      return canvas;
    };

    var paintGUI = function(){

      var position = {};
      ctx.clearRect( 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#cccccc';
      ctx.fillRect( 20, 0, 1, canvas.height);
      ctx.fillRect( 0, canvas.height-20, canvas.width, 1);

      for(var i = 0; i < canvas.width; i++) {
        position = {
          x: i,
          y: getSine(i)
        };
        ctx.fillStyle = 'red';
        ctx.fillRect( position.x, position.y*canvas.height, 1, 1);
      }

    };
    return {
      set: function(params){
        var params = params || {};
        set(params);
      },
      get: get,
      getGUI: getGUI
    };
  }


  function LFO(model){
    //
    var worker = new Worker({
      amplitude: parseFloat(model.LFO.amplitude()),
      frequency: parseFloat(model.LFO.frequency()),
      x: parseFloat(model.LFO.x()),
      y: parseFloat(model.LFO.y())
    });
    //
    this.setLFO = function(){
      model.level(worker.get().y);
    };
    //
    model.LFO.amplitude.subscribe(function(value){
      worker.set({
        amplitude: parseFloat(value)
      });
    });
    //
    model.LFO.frequency.subscribe(function(value){
      worker.set({
        frequency: parseFloat(value)
      });
    });
    //
    model.LFO.x.subscribe(function(value){
      worker.set({
        x: parseFloat(value)
      });
    });
    //
    model.LFO.y.subscribe(function(value){
      worker.set({
        y: parseFloat(value)
      });
    });
  };

  return LFO;

});