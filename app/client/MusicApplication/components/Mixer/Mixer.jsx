import React, { Children } from 'react';

const Mixer = ({
  children
}) => {

  const levels = Children.toArray(children).map(level => {
    return level;
  });

  return (
    <div>
      {levels}
    </div>
  );
};

export default Mixer;
