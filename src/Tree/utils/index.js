export function getPosition(level, index) {
    return `${level}-${index}`;
}

export function getKey(key, pos) {
    if (key !== null && key !== undefined) {
      return key;
    }
    return pos;
}

export function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}

export function toArray(children)  {
  let ret= [];

  React.Children.forEach(children, (child) => {
    if (child === undefined || child === null) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    }else {
      ret.push(child);
    }
  });

  return ret;
}

export function flattenTreeData(treeNodeList = [],expandedKeys = [])  {//转化数据
  
    // const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
    const flattenList  = [];
  
    function dig(list , parent )  {
      return list.map((treeNode, index) => {
        //第一次渲染0-0
        const pos  = getPosition(parent ? parent.pos : '0', index);
        //如果有key就用key否则就用pos
        // const mergedKey = getKey(treeNode.key, pos);
  
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
  
        // // Loop treeNode children
        // if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        //   flattenNode.children = dig(treeNode.children || [], flattenNode);
        // } else {
        //   flattenNode.children = [];
        // }
  
        return flattenNode;
      });
    }
  
    dig(treeNodeList);
  
    return flattenList;
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

export function convertDataToEntities(dataNodes) {
  const posEntities = {};
  const keyEntities = {};
 
  let wrapper = {
    posEntities,
    keyEntities,
  };

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
 
  });
   

  return wrapper;
}

/**
 * Traverse all the data by `treeData`.
 * Please not use it out of the `rc-tree` since we may refactor this code.
 */
export function traverseDataNodes(dataNodes,callback) {//递归展示上下级关系

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

export function getTreeNodeProps(key,{expandedKeys}) {

  const treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,

  };

  return treeNodeProps;
}

export function convertNodePropsToEventData(props) {
  const {
    expanded,
    data,
  } = props;

  const eventData = {
    expanded,
    ...data
  };

  return eventData;
}