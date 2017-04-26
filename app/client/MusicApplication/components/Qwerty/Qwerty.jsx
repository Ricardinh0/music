import React from 'react';
import keyMap from '../../utils/utils.keyMap';
import styles from './styles';


const Qwerty = ({

}) => {

  /*
  ko.observableArray((function(){ 
    return getKeyDataArray([49,50,51,52,53,54,55,56,57,48]) 
  })()),
  ko.observableArray((function(){ 
    return getKeyDataArray([81,87,69,82,84,89,85,73,79,80]) 
  })()),
  ko.observableArray((function(){ 
    return getKeyDataArray([65,83,68,70,71,72,74,75,76]) 
  })()),
  ko.observableArray((function(){ 
    return getKeyDataArray([90,88,67,86,66,78,77]) 
  })())
  */

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.key}>`</button>
      </div>
    </div>
  )
};

export default Qwerty;
