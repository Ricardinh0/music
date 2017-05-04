import React, { Component } from 'react';
import bufferLoader from '../../utils/utils.bufferLoader';
import styles from './styles.scss';

class SoundBank extends Component {

  handleFileChange = e => {
    const { 
      handleSoundbankSave,
      soundBank
    } = this.props;
    const src = URL.createObjectURL(e.target.files[0]);
    // Dispatch load with src and ctx so that a return arrayBuffer is added to correct key
    handleSoundbankSave({
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
