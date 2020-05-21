import * as React from 'react';
import RcTree, { TreeNode } from './rc-tree/index';
import classNames from 'classnames';
import { ConfigContext } from '../../ConfigContext';
import Icon from './../../components/icon';

const Tree = React.forwardRef((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon,
    blockNode,
    children,
    checkable,
  } = props;

  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  
  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      {...props}
      prefixCls={prefixCls}
      className={classNames(className, {
        [`${prefixCls}-icon-hide`]: !showIcon,
        [`${prefixCls}-block-node`]: blockNode,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      })}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      switcherIcon={<Icon name="checkbox-uncheck"></Icon>}
    >
      {children}
    </RcTree>
  );
}) ;

Tree.TreeNode = TreeNode;

const getCollapsedHeight =() => ({ height: 0, opacity: 0 });
const getRealHeight = node => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight = node => ({ height: node.offsetHeight });

Tree.defaultProps = {
  checkable: false,
  showIcon: false,
  motion: {
    motionName: 'ant-motion-collapse',
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
    motionDeadline: 500,
    motionAppear: false,
  },
  blockNode: false,
};

export default Tree;