import * as React from 'react';
import RcTree, { TreeNode } from './rc-tree/index';
import classNames from 'classnames';
import { ConfigContext } from '../../ConfigContext';
import Icon from './../../components/icon';

const Tree = React.forwardRef((props, ref) => {
  const {  } = React.useContext(ConfigContext);

  const {
 
  } = props;
  
  return (
    <RcTree
      {...props}
      switcherIcon={<Icon name="checkbox-checked"></Icon>}
    >
    </RcTree>
  );
}) ;

Tree.TreeNode = TreeNode;

const getCollapsedHeight =() => ({ height: 0, opacity: 0 });
const getRealHeight = node => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight = node => ({ height: node.offsetHeight });

Tree.defaultProps = {
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
 
};

export default Tree;