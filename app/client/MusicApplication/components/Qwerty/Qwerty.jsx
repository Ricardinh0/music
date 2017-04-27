import React from 'react';
import styles from './styles.scss';


const Qwerty = ({
  keys
}) => {

  return (
    <div>
      <div className={styles.row}>
        {keys.map((obj, i) => 
          <button 
            key={i}
            className={styles.key}
            style={{ background: obj.active ? 'red' : '' }}
          >
            {obj.keyCode}
          </button>
        )}
      </div>
    </div>
  );
};

export default Qwerty;
