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

  constructor(props) {
    super(props);
    const {
      ctx
    } = props;
    this.delayNode = ctx.createDelay();
    this.feedbackNode = ctx.createGain();
    this.filterNode = ctx.createBiquadFilter();
    this.state = {
      delay: 0.5,
      feedback: 0.6,
      filter: 1000
    };
  }

  componentDidMount() {
    const { 
      delayNode,
      feedbackNode,
      filterNode
    } = this;
    const { 
      delay,
      feedback,
      filter,
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
    delayNode.delayTime.value = delay;
    feedbackNode.gain.value = feedback;
    filterNode.frequency.value = filter;
  }

  onChange = (e) => {
    const { target: { name, value }} = e;
    const { delayNode, feedbackNode, filterNode } = this;
    this.setState({
      [name]: value
    }, () => {
      switch (name) {
        case 'delay':
          delayNode.delayTime.value = value;
          break;
        case 'feedback':
          feedbackNode.gain.value = value;
          break;
        case 'filter':
          filterNode.frequency.value = value;
          break;
      }
    })
  }

  render() {
    const {
      onChange
    } = this;
    const {
      delay,
      feedback,
      filter
    } = this.state;

    return (
      <div>
        <h3>Delay</h3>
        <div>
          <input
            name="delay"
            type="range"
            step="0.01"
            min="0"
            max="1"
            defaultValue={delay}
            onChange={onChange}
          />
          <output>{delay}</output>
        </div>
        <div>
          <input
            name="feedback"
            type="range"
            step="0.01"
            min="0"
            max="1"
            defaultValue={feedback}
            onChange={onChange}
          />
          <output>{feedback}</output>
        </div>
        <div>
          <input
            name="filter"
            type="range"
            step="10"
            min="0"
            max="2000"
            defaultValue={filter}
            onChange={onChange}
          />
          <output>{filter}</output>
        </div>
        <button>Delete</button>
      </div>
    );
  }
}

export default Delay;
