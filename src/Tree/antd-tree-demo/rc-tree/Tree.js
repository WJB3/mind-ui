import * as React from 'react';
import { TreeContext } from './contextTypes';
import {
  conductExpandParent,
  arrAdd,
  arrDel,
} from './util';
 
import {
  flattenTreeData,
  convertTreeToData,
  convertDataToEntities,
} from './utils/treeUtil';
import NodeList  from './NodeList';
import TreeNode from './TreeNode';
 
 
class Tree extends React.Component {
  static defaultProps = {
    checkStrictly: false,
    defaultExpandParent: true,
    autoExpandParent: false,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
  };

  static TreeNode = TreeNode;

  delayedDragEnterLogic;

  state = {
    keyEntities: {},
    selectedKeys: [],
    checkedKeys: [],
    halfCheckedKeys: [],
    loadedKeys: [],
    loadingKeys: [],
    expandedKeys: [],
    dragging: false,
    dragNodesKeys: [],
    dragOverNodeKey: null,
    dropPosition: null,
    treeData: [],
    flattenNodes: [],
    activeKey: null,
    listChanging: false,
    prevProps: null,
  };

  dragNode ;

  listRef = React.createRef();

  static getDerivedStateFromProps(props , prevState) {
    const { prevProps } = prevState;
    const newState  = {
      prevProps: props,
    };

    function needSync(name) {
      return (!prevProps && name in props) || (prevProps && prevProps[name] !== props[name]);
    }

    // ================== Tree Node ==================
    let treeData ;
 

    // Check if `treeData` or `children` changed and save into the state.
    if (needSync('treeData')) {
      ({ treeData } = props);
    } else if (needSync('children')) {

      treeData = convertTreeToData(props.children);
    }

    // Save flatten nodes info and convert `treeData` into keyEntities
    if (treeData) {
    
      newState.treeData = treeData;
      const entitiesMap = convertDataToEntities(treeData);
      newState.keyEntities = {
 
        ...entitiesMap.keyEntities,
      };
 
    }

    const keyEntities = newState.keyEntities || prevState.keyEntities;

    // ================ expandedKeys =================
    if (needSync('expandedKeys') || (prevProps && needSync('autoExpandParent'))) {
      newState.expandedKeys =
        props.autoExpandParent || (!prevProps && props.defaultExpandParent)
          ? conductExpandParent(props.expandedKeys, keyEntities)
          : props.expandedKeys;
    } else if (!prevProps && props.defaultExpandAll) {
      const cloneKeyEntities = { ...keyEntities };
 
      newState.expandedKeys = Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
    } else if (!prevProps && props.defaultExpandedKeys) {
      newState.expandedKeys =
        props.autoExpandParent || props.defaultExpandParent
          ? conductExpandParent(props.defaultExpandedKeys, keyEntities)
          : props.defaultExpandedKeys;
    }

    if (!newState.expandedKeys) {
      delete newState.expandedKeys;
    }

    // ================ flattenNodes =================
    if (treeData || newState.expandedKeys) {
      
      const flattenNodes  = flattenTreeData(
        treeData || prevState.treeData,
        newState.expandedKeys || prevState.expandedKeys,
      );
      console.log(flattenNodes);
      newState.flattenNodes = flattenNodes;
    }

    // ================= loadedKeys ==================
    if (needSync('loadedKeys')) {
      newState.loadedKeys = props.loadedKeys;
    }
 

    return newState;
  }

 
  getTreeNodeRequiredProps = () => {
    const {
      expandedKeys,
      selectedKeys,
      loadedKeys,
      loadingKeys,
      checkedKeys,
      halfCheckedKeys,
      dragOverNodeKey,
      dropPosition,
      keyEntities,
    } = this.state;
    return {
      expandedKeys: expandedKeys || [],
      selectedKeys: selectedKeys || [],
      loadedKeys: loadedKeys || [],
      loadingKeys: loadingKeys || [],
      checkedKeys: checkedKeys || [],
      halfCheckedKeys: halfCheckedKeys || [],
      dragOverNodeKey,
      dropPosition,
      keyEntities,
    };
  };

  // =========================== Expanded ===========================
  /** Set uncontrolled `expandedKeys`. This will also auto update `flattenNodes`. */
  setExpandedKeys = (expandedKeys ) => {
    const { treeData } = this.state;

    const flattenNodes  = flattenTreeData(treeData, expandedKeys);
    console.log(flattenNodes);
    this.setUncontrolledState(
      {
        expandedKeys,
        flattenNodes,
      },
      true,
    );
  };

  onNodeExpand = (e , treeNode) => {
    console.log("onNodeExpand")
    let { expandedKeys } = this.state;
    const { listChanging } = this.state;
    const { onExpand } = this.props;
    const { key, expanded } = treeNode;

    if (listChanging) {
      return;
    }

    // Update selected keys
    const index = expandedKeys.indexOf(key);
    const targetExpanded = !expanded;

    

    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, key);
    } else {
      expandedKeys = arrDel(expandedKeys, key);
    }

    this.setExpandedKeys(expandedKeys);

    if (onExpand) {
      onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent,
      });
    }

     
  };
  /**
   * Only update the value which is not in props
   */
  setUncontrolledState = (
    state ,
    atomic = false,
    forceState = null,
  ) => {
    let needSync = false;
    let allPassed = true;
    const newState = {};

    Object.keys(state).forEach(name => {
      if (name in this.props) {
        allPassed = false;
        return;
      }

      needSync = true;
      newState[name] = state[name];
    });

    if (needSync && (!atomic || allPassed)) {
      this.setState({
        ...newState,
        ...forceState,
      } );
    }
  };

  scrollTo  = scroll => {
    this.listRef.current.scrollTo(scroll);
  };

  render() {
    const {  flattenNodes, keyEntities } = this.state;
    const {
      switcherIcon,
      checkStrictly,
      filterTreeNode,
    } = this.props;
 

    return (
      <TreeContext.Provider
        value={{
          switcherIcon,
          checkStrictly,
          keyEntities,
          filterTreeNode,
          onNodeExpand: this.onNodeExpand,
 
        }}
      >
        <div className="rc-tree">
          <NodeList
            ref={this.listRef}
            data={flattenNodes}
            tabIndex={0}
            {...this.getTreeNodeRequiredProps()}
          />
        </div>
      </TreeContext.Provider>
    );
  }
}

export default Tree;