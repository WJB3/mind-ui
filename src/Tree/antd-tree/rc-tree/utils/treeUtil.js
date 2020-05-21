import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
 
import { getPosition, isTreeNode } from '../util';;

export function getKey(key, pos) {
  if (key !== null && key !== undefined) {
    return key;
  }
  return pos;
}

/**
 * Warning if TreeNode do not provides key
 */
export function warningWithoutKey(treeData = []) {
  const keys= new Map();

  function dig(list, path = '') {
    (list || []).forEach(treeNode => {
      const { key, children } = treeNode;
    

      const recordKey = String(key);
    
      keys.set(recordKey, true);

      dig(children, `${path}${recordKey} > `);
    });
  }

  dig(treeData);
}

/**
 * Convert `children` of Tree into `treeData` structure.
 */
export function convertTreeToData(rootNodes) {
  function dig(node){
    const treeNodes = toArray(node);
    return treeNodes
      .map(treeNode => {
        // Filter invalidate node
        if (!isTreeNode(treeNode)) {
          
          return null;
        }

        const { key } = treeNode;
        const { children, ...rest } = treeNode.props;

        const dataNode = {
          key,
          ...rest,
        };

        const parsedChildren = dig(children);
        if (parsedChildren.length) {
          dataNode.children = parsedChildren;
        }

        return dataNode;
      })
      .filter((dataNode) => dataNode);
  }

  return dig(rootNodes);
}

/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */
export function flattenTreeData(
  treeNodeList = [],
  expandedKeys = [],
)  {
  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const flattenList  = [];

  function dig(list , parent )  {
    return list.map((treeNode, index) => {
      const pos  = getPosition(parent ? parent.pos : '0', index);
      const mergedKey = getKey(treeNode.key, pos);

      // Add FlattenDataNode into list
      const flattenNode = {
        ...treeNode,
        parent,
        pos,
        children: null,
        data: treeNode,
        isStart: [...(parent ? parent.isStart : []), index === 0],
        isEnd: [...(parent ? parent.isEnd : []), index === list.length - 1],
      };

      flattenList.push(flattenNode);

      // Loop treeNode children
      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode.children || [], flattenNode);
      } else {
        flattenNode.children = [];
      }

      return flattenNode;
    });
  }

  dig(treeNodeList);

  return flattenList;
}

/**
 * Traverse all the data by `treeData`.
 * Please not use it out of the `rc-tree` since we may refactor this code.
 */
export function traverseDataNodes(
  dataNodes,
  callback
) {
  function processNode(
    node,
    index,
    parent,
  ) {
    const children = node ? node.children : dataNodes;
    const pos = node ? getPosition(parent.pos, index) : '0';

    // Process node if is not root
    if (node) {
      const data = {
        node,
        index,
        pos,
        key: node.key !== null ? node.key : pos,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
      };

      callback(data);
    }

    // Process children node
    if (children) {
      children.forEach((subNode, subIndex) => {
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1,
        });
      });
    }
  }

  processNode(null);
}

 

/**
 * Convert `treeData` into entity records.
 */
export function convertDataToEntities(
  dataNodes,
  {
    initWrapper,
    processEntity,
    onProcessFinished,
  }= {},
) {
  const posEntities = {};
  const keyEntities = {};
  let wrapper = {
    posEntities,
    keyEntities,
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseDataNodes(dataNodes, item => {
    const { node, index, pos, key, parentPos, level } = item;
    const entity = { node, index, key, pos, level };

    const mergedKey = getKey(key, pos);

    posEntities[pos] = entity;
    keyEntities[mergedKey] = entity;

    // Fill children
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}

 

/**
 * Get TreeNode props with Tree props.
 */
export function getTreeNodeProps(
  key,{expandedKeys,selectedKeys,loadedKeys,loadingKeys,checkedKeys,halfCheckedKeys,dragOverNodeKey,dropPosition,keyEntities}
) {
  const entity = keyEntities[key];

  const treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ''),

    // [Legacy] Drag props
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1,
  };

  return treeNodeProps;
}

export function convertNodePropsToEventData(props) {
  const {
    data,
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
  } = props;

  const eventData = {
    ...data,
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
  };

 
  return eventData;
}