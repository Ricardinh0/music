import React, { Component } from 'react';
/*
*
*   Node map
*
*           Feedback    Filter
*                 o --- o
*                   \ /    (Route A > Delay > Feedback > Filter > Delay)
*                  Delay
*                    o    (Route B > Input > Delay > master)
*                   / \
*      Input ---- o  -  o --- Master node
*                (Route C > Input > Master)
*
*/
class Delay extends Component {

  static defaultProps = {
    delay: 0,
    feedback: 0,
    filter: 0
  }

  componentDidMount() {
    // // Set up "Route A" (see above)
    // delay.connect(feedback);
    // feedback.connect(filter);
    // filter.connect(delay);
    // // Set up "Route B" (see above)
    // this.inputNode.connect(delay);
    // delay.connect(this.master);
    // // Set up "Route C" (see above)
    // this.inputNode.connect(this.master);
  }

  componentWillReceiveProps(nextProps) {
    // const { node: { delayNode, feedbackNode, filterNode } } = this.state;
    // const { delay, feedback, filter } = nextProps;
    // delayNode.delayTime.value = delay;
    // feedbackNode.gain.value = feedback;
    // filterNode.frequency.value = filter;
  }

  render() {
    const {
      delay,
      feedback,
      filter
    } = this.props;
    return (
      <div>
        <h3>Delay</h3>
        <input
          type="range"
          step="0.01"
          min="0"
          max="1"
          defaultValue={delay}
        />
        <input
          type="range"
          step="0.01"
          min="0"
          max="1"
          defaultValue={feedback}
        />
        <input 
          type="range"
          step="10"
          min="0"
          max="2000"
          defaultValue={filter}
        />
        <button>Delete</button>
      </div>
    );
  }
}

export default Delay;
