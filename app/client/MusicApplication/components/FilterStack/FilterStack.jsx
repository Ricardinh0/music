import React, { Component } from 'react';
import FilterFactory from './FilterFactory';

class FilterStack extends Component {

  constructor(props) {
    super(props);
    const {
      ctx
    } = props;

    const filterList = [
      { type: 'delay' },
      { type: 'phaser' }
    ]

    this.nodeList = Array.from(filterList, () => ({
      input: ctx.createGain(),
      output: ctx.createGain()
    }));

    this.state = {
      select: 'default',
      filterList: filterList
    };
  }

  componentDidMount() {
    this.connect();
  }

  connect() {
    const { nodeList } = this;
    const { input, output } = this.props;
    if (nodeList.length) {
      input.connect(nodeList[0].input);
      nodeList.map((node, i) => {
        if (nodeList[i + 1]) {
          node.output.connect(nodeList[i + 1].input);
        }
      });
      nodeList[nodeList.length - 1].output.connect(output);
    } else {
      input.connect(output);
    }
  }

  disconnect() {
    const { nodeList } = this;
    const { input } = this.props;
    input.disconnect();
    nodeList.map((node, i) => {
      node.output.disconnect();
    });
  }

  handleAdd(filter) {
    const { ctx } = this.props;
    const { filterList } = this.state;
    //
    this.disconnect();
    //  Add space to nodeList
    this.nodeList = [
      ...this.nodeList,
      {
        input: ctx.createGain(),
        output: ctx.createGain()
      }
    ];
    //  Update connections
    this.connect();
    //  Update filterList
    this.setState({
      filterList: [
        ...filterList,
        filter
      ]
    })
  }

  handleDelete = (e) => {
    const { target: { name }} = e;
    const { ctx } = this.props;
    const { filterList } = this.state;
    //
    this.disconnect();
    //
    this.setState({
      filterList: filterList.filter((filter, i) => i !== parseInt(name))
    }, () => {
      //  Add space to nodeList
      this.nodeList.splice(parseInt(name), 1);
      //  Update connections
      this.connect();
    });
  }

  handleSelectChange = (e) => {
    const { target: { value } } = e;
    if (value !== 'default') {
      this.handleAdd({
        type: value
      })
    }
  }

  render() {
    const {
      nodeList,
      handleDelete,
      handleSelectChange
    } = this;
    const {
      filterList,
      select
    } = this.state;
    const {
      ctx,
      isPlaying
    } = this.props;

    return (
      <div>
        <select defaultValue={select} onChange={handleSelectChange}>
          <option value="default">Please select</option>
          <option value="delay">Delay</option>
          <option value="phaser">Phaser</option>
        </select>
        {filterList.map((filter, i) => FilterFactory.build({
          ...filter,
          ctx,
          ...nodeList[i],
          isPlaying,
          index: i,
          onDelete: handleDelete
        }, i))}
      </div>
    );
  }
};

export default FilterStack;
