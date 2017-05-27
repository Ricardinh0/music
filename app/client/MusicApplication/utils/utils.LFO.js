export default (params = {
  amplitude: 1,
  frequency: 500,
  x: 0,
  y: 0
}) => {
  //  PI
  const PI = 3.14159;
  //  The ∆ of a beat at 4 beats per bar
  const radian = 2 * PI;
  //  Expand Vertically
  let amplitude = params.amplitude;
  //  Shrink horizontally
  let frequency = params.frequency;
  //  X phase
  let x = params.x || 0;
  //  Y Phase
  let y = params.y || 0;
  //
  let i = 0;
  //
  return {
    get: () => {
      i += 1;
      return amplitude * Math.sin(frequency * ((radian * i) - x )) + y;
    },
    set: (newFrequency) => {
      frequency = newFrequency;
    }
  };
};
