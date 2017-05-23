import React, { Component } from 'react';
import Delay from '../Delay/Delay';
import Filter from './factory';


class FilterStack extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      ctx,
      input,
      output,
      filterList,
      handleFilterChange
    } = this.props;

    //  console.log(Filter.build(filterList[0]));

    return (
      <div>
        <Delay
          ctx={ctx}
          input={input}
          output={output}
          index={0}
          {...filterList[0]}
          onChange={handleFilterChange}
        />
      </div>
    );
  }
};

export default FilterStack;
