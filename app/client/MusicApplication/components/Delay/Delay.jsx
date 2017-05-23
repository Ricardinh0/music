import React, { PureComponent } from 'react';
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
class Delay extends PureComponent {

  static defaultProps = {
    delay: 0.5,
    feedback: 0.6,
    filter: 1000
  }

  constructor(props) {
    super(props);
    const delayNode = props.ctx.createDelay();
    const feedbackNode = props.ctx.createGain();
    const filterNode = props.ctx.createBiquadFilter();
    this.state = {
      delayNode,
      feedbackNode,
      filterNode
    }
  }

  componentDidMount() {
    const { 
      delayNode,
      feedbackNode,
      filterNode
    } = this.state;
    const { 
      input,
      output
    } = this.props;
    // Set up "Route A" (see above)
    delayNode.connect(feedbackNode);
    feedbackNode.connect(filterNode);
    filterNode.connect(delayNode);
    // Set up "Route B" (see above)
    input.connect(delayNode);
    delayNode.connect(output);
    // Set up "Route C" (see above)
    input.connect(output);
    //
    delayNode.delayTime.value = 0.5;
    feedbackNode.gain.value = 0.5;
    filterNode.frequency.value = 300;
  }

  componentWillReceiveProps(nextProps) {
    const { delayNode, feedbackNode, filterNode } = this.state;
    const { delay, feedback, filter } = nextProps;
    delayNode.delayTime.value = delay;
    feedbackNode.gain.value = feedback;
    filterNode.frequency.value = filter;
  }

  render() {
    const {
      onChange,
      delay,
      feedback,
      filter,
      index,
      type
    } = this.props;

    return (
      <div>
        <h3>Delay</h3>
        <input
          name="delay"
          id={index + '_delay'}
          type="range"
          step="0.01"
          min="0"
          max="1"
          defaultValue={delay}
          onChange={onChange}
        />
        <input
          name="feedback"
          id={index + '_feedback'}
          type="range"
          step="0.01"
          min="0"
          max="1"
          defaultValue={feedback}
          onChange={onChange}
        />
        <input
          name="filter"
          id={index + '_filter'}
          type="range"
          step="10"
          min="0"
          max="2000"
          defaultValue={filter}
          onChange={onChange}
        />
        <button>Delete</button>
      </div>
    );
  }
}

export default Delay;
