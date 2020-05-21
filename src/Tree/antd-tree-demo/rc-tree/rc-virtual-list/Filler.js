import * as React from 'react';
import classNames from 'classnames';

 
/**
 * Fill component to provided the scroll content real height.
 */
const Filler  = ({
  height,
  offset,
  children,
  prefixCls,
}) => {
  let outerStyle  = {};

  let innerStyle  = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (offset !== undefined) {
    outerStyle = { height, position: 'relative', overflow: 'hidden' };

    innerStyle = {
      ...innerStyle,
      transform: `translateY(${offset}px)`,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    };
  }

  return (
    <div style={outerStyle}>
      <div
        style={innerStyle}
        
        
      >
        {children}
      </div>
    </div>
  );
};

export default Filler;