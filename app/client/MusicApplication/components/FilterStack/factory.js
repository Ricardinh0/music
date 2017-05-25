import React from 'react';
import Delay from '../Delay/Delay';

export default class Filter {
  static build (filter) {
    switch (filter.type) {
      case 'delay':
        return <Delay {...filter} />;
      default:
        return null;
    }
  }
}
