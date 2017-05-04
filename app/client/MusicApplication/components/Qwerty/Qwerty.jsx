import React, { PropTypes } from 'react';
import QwertyKey from '../QwertyKey/QwertyKey';
import styles from './styles.scss';

const Qwerty = ({
  keys,
  handleClick
}) => {
  const buttons = (arr, rowList) => arr.filter((obj) => {
    if (obj.hasOwnProperty('keyCode')) {
      if (rowList.filter(n => n === obj.keyCode).length) {
        return true;
      }
    }
  });

  const row = arr => arr.map((obj, index) =>
    <QwertyKey
      key={index}
      data={obj}
      handleClick={handleClick}
    />
  );

  const rowA = buttons(keys, [192, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 189, 187]);
  const rowB = buttons(keys, [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220]);
  const rowC = buttons(keys, [65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222]);
  const rowD = buttons(keys, [90, 88, 67, 86, 66, 78, 77, 188, 190, 191]);

  return (
    <div className={styles.qwerty}>
      <div className={styles.row}>
        {row(rowA)}
      </div>
      <div className={styles.row}>
        {row(rowB)}
      </div>
      <div className={styles.row}>
        {row(rowC)}
      </div>
      <div className={styles.row}>
        {row(rowD)}
      </div>
      <div className={styles.row}>
        <button className={styles.key}>space bar</button>
      </div>
    </div>
  );
};

Qwerty.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    key: PropTypes.string,
    keyCode: PropTypes.number
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Qwerty;
