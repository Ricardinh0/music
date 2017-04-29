import React from 'react';
import styles from './styles.scss';

const Qwerty = ({
  keys,
  handleClick
}) => {
  return (
    <div>
      <div className={styles.row}>
        {keys.map((obj, i) => 
          <button 
            key={i}
            className={styles.key}
            style={{ background: obj.active ? 'red' : '' }}
            onClick={() => handleClick({ keyCode: obj.keyCode })}
          >
            {obj.key}
          </button>
        )}
      </div>
    </div>
  );
};

export default Qwerty;
