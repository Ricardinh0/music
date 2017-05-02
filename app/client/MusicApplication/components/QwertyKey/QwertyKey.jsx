import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

class QwertKey extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.props;
    const { data:next } = nextProps;
    if (data.active===next.active) {
      return false;
    } else {
      return true;
    }
  }

  handleKeyClick = () => {
    const {
      handleClick,
      data: {
        keyCode
      }
    } = this.props;
    handleClick({ keyCode: keyCode })
  };

  render() {
    const {
      handleKeyClick
    } = this;

    const {
      data
    } = this.props;

    return (
      <button
        className={styles.key}
        style={{ background: data.active ? 'red' : '' }}
        onClick={handleKeyClick}
      >
        {data.key}
      </button>
    );
  }
}

export default QwertKey;
