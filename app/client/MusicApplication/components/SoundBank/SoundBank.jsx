import React from 'react';
import styles from './styles.scss';

const SoundBank = ({
  handleCancel,
  handleClose
}) => (
  <div className={styles.test}>
    SoundBank
    <button onClick={handleCancel}>Cancel</button>
    <button onClick={handleClose}>Close</button>
  </div>
);

export default SoundBank;
