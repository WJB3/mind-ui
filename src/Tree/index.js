import React, { useCallback, useState, useEffect } from 'react';

import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import {
    flattenTreeData,//转化虚拟节点
    convertTreeToData,
    convertDataToEntities,
    getTreeNodeProps,//获取接待你node
    convertNodePropsToEventData,
    arrDel,
    arrAdd
} from './utils/index';
import "./index.scss";
import TreeNode from './TreeNode';


const Tree = (props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        treeData
    } = props;

    const [flattenData, setFlattenData] = useState([]);//定义flatten数据
    const [keyEntities, setKeyEntities] = useState({});//定义enti数据
    let [expandedKeys, setExpandedKeys] = useState([]);//定义展开的key

    const treeNodeRequiredProps = {
        expandedKeys,
        keyEntities
    };


    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("tree", customizePrefixCls);

    useEffect(() => {
        if (treeData) {
            const flattenData = flattenTreeData(treeData,expandedKeys);//平铺数组
            const entitiesMap = convertDataToEntities(treeData);//转化数据
            setFlattenData(flattenData);
            setKeyEntities(entitiesMap.keyEntities);
        }
    }, [treeData,expandedKeys]);

    const onNodeExpand = (e, treeNode) => {
        const { key, expanded } = treeNode;
        const targetExpanded = !expanded;
        if (targetExpanded) {//如果没有选中
            expandedKeys = arrAdd(expandedKeys, key);
        } else {
            expandedKeys = arrDel(expandedKeys, key);
        }
        setExpandedKeys(expandedKeys)
    };

    return <div className={classNames(prefixCls, className)}>
        {
            flattenData.map((treeNode, index) => {
                 
                const {
                    data: { key }
                } = treeNode;

                const treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);

                return <TreeNode
                    {...treeNodeProps}
                    data={treeNode}
                    prefixCls={prefixCls}
                    onNodeExpand={onNodeExpand}
                    key={key}
                />
            })
        }
    </div>
}

export default Tree;

