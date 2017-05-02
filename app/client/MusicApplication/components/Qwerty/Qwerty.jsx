import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Qwerty = ({
  keys,
  handleClick
}) => {


  const getKeyButtons = (arr, rowList) => arr.filter((obj) => {
    if (obj.hasOwnProperty('keyCode')) {
      if (rowList.filter(n => n === obj.keyCode).length) {
        return true;
      }
    }
  });

  const row = getKeyButtons(keys, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);

  return (
    <div>
      <div className={styles.row}>
        {row.map((obj, i) => 
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

Qwerty.propTypes = {
  keys: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Qwerty;
