const requestAnimationFrame = (function(){
  return  window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          window.oRequestAnimationFrame       ||
          function(fn){
            window.setTimeout(fn, 1000/60);
          };

})();

export default requestAnimationFrame;
