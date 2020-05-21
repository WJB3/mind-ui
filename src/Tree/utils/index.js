export function getPosition(level, index) {
    return `${level}-${index}`;
}

export function getKey(key, pos) {
    if (key !== null && key !== undefined) {
      return key;
    }
    return pos;
}

export function flattenTreeData(treeNodeList = [],expandedKeys = [])  {
  
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