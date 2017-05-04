import React from 'react';
import BufferLoader from '../../utils/utils.bufferLoader';
import styles from './styles.scss';

const SoundBank = ({
  handleCancel,
  handleClose
}) => {

  const handleFileChange = e => {
    const src = URL.createObjectURL(e.target.files[0]);
    debugger;
    const b = new BufferLoader({

    }).loadBuffer({
      file: src
    });
  };

  return (
    <div className={styles.test}>
      SoundBank
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleClose}>Close</button>
    </div>
  )
};

export default SoundBank;
