import * as React from 'react';
import VirtualList from './rc-virtual-list/List';
import MotionTreeNode from './MotionTreeNode';
import { findExpandedKeys, getExpandRange } from './utils/diffUtil';
import { getTreeNodeProps, getKey } from './utils/treeUtil';
 
 
export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

const MotionNode = {
  key: MOTION_KEY,
};

export const MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MotionNode,
};

const MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: [],
};




/**
 * We only need get visible content items to play the animation.
 */
export function getMinimumRangeTransitionRange(list) {
  return list.slice(0, Math.ceil(0 / 0) + 1);
}

 
 
const RefNodeList = (props, ref) => {
  const {
    prefixCls,
    data,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    loadedKeys,
    loadingKeys,
    halfCheckedKeys,
    keyEntities,
    dropPosition,
    activeItem,
  } = props;

  // =============================== Ref ================================
  const listRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    scrollTo: scroll => {
      listRef.current.scrollTo(scroll);
    },
  }));

 
  const [prevExpandedKeys, setPrevExpandedKeys] = React.useState(expandedKeys);
  const [prevData, setPrevData] = React.useState(data);
  const [transitionData, setTransitionData] = React.useState(data);
  const [transitionRange, setTransitionRange] = React.useState([]);
 
 

  // Do animation if expanded keys changed
  React.useEffect(() => {
    setPrevExpandedKeys(expandedKeys);

    const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        const keyIndex = prevData.findIndex(({ data: { key } }) => key === diffExpanded.key);

     
        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(prevData, data, diffExpanded.key)
        );

        const newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
       
      } else {
        const keyIndex = data.findIndex(({ data: { key } }) => key === diffExpanded.key);

       
        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(data, prevData, diffExpanded.key)
        );

        const newTransitionData  = data.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
  
      } 
    } else if (prevData !== data) {
      // If whole data changed, we just refresh the list
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]);


  const treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dropPosition,
    keyEntities,
  };

 
  return (
   
      <VirtualList 
        data={data}
      >
        {(treeNode) => {
          console.log(treeNode)
          const {
            pos,
            data: { key, ...restProps },
            isStart,
            isEnd,
          } = treeNode;
          const mergedKey = getKey(key, pos);
          delete restProps.children;

          const treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
          console.log(restProps)
          console.log(treeNodeProps)
          return (
            <MotionTreeNode
              {...restProps}
              {...treeNodeProps}
              active={activeItem && key === activeItem.data.key}
              pos={pos}
              data={treeNode.data}
              isStart={isStart}
              isEnd={isEnd}
              motionNodes={key === MOTION_KEY ? transitionRange : null}
              treeNodeRequiredProps={treeNodeRequiredProps}
             
            />
          );
        }}
      </VirtualList>
 
  );
};

const NodeList = React.forwardRef(RefNodeList);
NodeList.displayName = 'NodeList';

export default NodeList;