import * as React from 'react';
import classNames from 'classnames';
// @ts-ignore
import CSSMotion from './css-motion/CSSMotion';
import TreeNode from './TreeNode';
import { getTreeNodeProps } from './utils/treeUtil';
import { TreeContext } from './contextTypes';

 
const MotionTreeNode = (
  {
    className,
    style,
    motion,
    motionNodes,
    motionType,
    onMotionEnd: onOriginMotionEnd,
    active,
    treeNodeRequiredProps,
    ...props
  },
  ref,
) => {
  const [visible, setVisible] = React.useState(true);
  const { prefixCls } = React.useContext(TreeContext);

  const motionedRef = React.useRef(false);

  const onMotionEnd = () => {
    if (!motionedRef.current) {
      onOriginMotionEnd();
    }
    motionedRef.current = true;
  };

  React.useEffect(() => {
    if (motionNodes && motionType === 'hide' && visible) {
      setVisible(false);
    }
  }, [motionNodes]);

  React.useEffect(
    () => () => {
      if (motionNodes) {
        onMotionEnd();
      }
    },
    [],
  );

  console.log(props)
  
  return <TreeNode domRef={ref} className={className} style={style} {...props} active={active} />;
};

MotionTreeNode.displayName = 'MotionTreeNode';

const RefMotionTreeNode = React.forwardRef(MotionTreeNode);

export default RefMotionTreeNode;