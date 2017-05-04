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
      <div className={styles.qwertyKey}>
        <div className={styles.key}>  
          <button
            className={styles.button}
            style={{ background: data.active ? 'red' : '' }}
            onClick={handleKeyClick}
          >
            {data.key}
          </button>
        </div>
      </div>
    );
  }
}

export default QwertKey;
