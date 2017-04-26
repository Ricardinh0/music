// function(){
//   //  PI
//   var PI = 3.14159;
//   //  Expand Vertically
//   var amplitude = params.amplitude || 0;
//   //  Shrink horizontally
//   var frequency = params.frequency || 0;
//   //  X phase
//   var x = params.x || 0;
//   //  Y Phase
//   var y = params.y || 0;
//   //  The ∆ of a beat at 4 beats per bar
//   var radian = 2*PI;
//   //
//   var count = 0;
//   //
//   var get = function(){
//     count++;
//     return {
//       y: getSine(count)
//     };
//   };
//   //
//   var getSine = function(i){
//     return amplitude * Math.sin( frequency * ( (radian*i) - x ) ) + y;
//   };
//   //
//   return {
//     get: get
//   }
// }