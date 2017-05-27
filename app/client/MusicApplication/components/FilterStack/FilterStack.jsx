import React, { Component } from 'react';
import Delay from '../Delay/Delay';
import Phaser from '../Phaser/Phaser';
import FilterFactory from './FilterFactory';

class FilterStack extends Component {

  constructor(props) {
    super(props);
    const {
      ctx,
      filterList
    } = props;
    this.nodeList = Array.from(filterList, () => ctx.createGain());
    this.state = {};
  }

  render() {
    const {
      nodeList
    } = this;
    const {
      ctx,
      input,
      output,
      filterList,
      isPlaying
    } = this.props;

    //  console.log(Filter.build(filterList[0]));

    return (
      <div>
        {filterList.map((filter, i) => FilterFactory.build({
          ...filter,
          ctx,
          input,
          output,
          isPlaying
        }, i))}
      </div>
    );
  }
};

export default FilterStack;
