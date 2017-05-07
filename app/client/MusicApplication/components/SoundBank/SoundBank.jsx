import React, { Component } from 'react';
import bufferLoader from '../../utils/utils.bufferLoader';
import styles from './styles.scss';

class SoundBank extends Component {

  componentWillMount() {
    const { handleKeyDown } = this;
    document.addEventListener('keydown', handleKeyDown);
  }

  componentWillUnmount() {
    const { handleKeyDown } = this;
    document.removeEventListener('keydown', handleKeyDown);
  }

  handleKeyDown = e => {
    const { handleCancel } = this;
    if (e.keyCode === 27) {
      handleCancel();
    }
  }

  handleFileChange = e => {
    const {
      audioMaster,
      handleSoundbankLoadFile,
      soundBank
    } = this.props;
    const src = URL.createObjectURL(e.target.files[0]);
    handleSoundbankLoadFile({
      ...audioMaster,
      ...soundBank,
      src
    })
  };

  handleCancel = e => {
    const { handleSoundbankCancel, soundBank } = this.props;
    handleSoundbankCancel(soundBank);
  };

  render() {
    const {
      handleFileChange,
      handleCancel
    } = this;

    return (
      <div className={styles.test}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }
};

export default SoundBank;
