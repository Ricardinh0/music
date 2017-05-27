import React from 'react';
import Delay from '../Delay/Delay';
import Phaser from '../Phaser/Phaser';

export default class FilterFactory {
  static build (filter, i) {
    switch (filter.type) {
      case 'delay':
        return <Delay key={i} {...filter} />;
      case 'phaser':
        return <Phaser key={i} {...filter} />;
      default:
        return null;
    }
  }
}
