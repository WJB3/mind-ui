import * as React from 'react';
import {classNames} from '../../../components/helper/className';
 

const Indent = ({ prefixCls, level, isStart, isEnd }) => {
  if (!level) {
    return null;
  }

  const baseClassName = `${prefixCls}-indent-unit`;
  const list = [];
  for (let i = 0; i < level; i += 1) {
    list.push(
      <span
        key={i}
        className={classNames(baseClassName, {
          [`${baseClassName}-start`]: isStart[i + 1],
          [`${baseClassName}-end`]: isEnd[i + 1],
        })}
      />,
    );
  }

  return (
    <span aria-hidden="true" className={`${prefixCls}-indent`}>
      {list}
    </span>
  );
};

export default Indent;