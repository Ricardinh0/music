import React, { PureComponent } from 'react';

function Worker(params) {
  //  PI
  const PI = 3.14159;
  //  The ∆ of a beat at 4 beats per bar
  const radian = 2 * PI;
  //  Expand Vertically
  let amplitude = params.amplitude || 0;
  //  Shrink horizontally
  let frequency = params.frequency || 0;
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
}

class Phaser extends PureComponent {

  constructor(props) {
    super(props);
    const allpassCount = 8;
    let allpass = [];
    for (let i = 0; i < allpassCount; i += 1) {
      allpass = [...allpass, props.ctx.createBiquadFilter()];
      allpass[i].type = 'allpass';
      allpass[i].frequency.value = 1000 * i;
    }
    this.state = {
      allpass
    };
  }

  componentDidMount() {

    const {
      allpass
    } = this.state;
    const { 
      input,
      output
    } = this.props;
    
    input.connect(allpass[0]);
    for (let i = 0; i < allpass.length; i += 1) {
      allpass[i].connect(allpass[i + 1] || output);
    }
    input.connect(output);

  }


  render() {
    return (
      <div>
        <h3>Phaser</h3>
      </div>
    );
  }
}

export default Phaser;
