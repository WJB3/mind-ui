import React, { useCallback, useState, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import {
    flattenTreeData,//转化虚拟节点
    convertTreeToData,
    convertDataToEntities
} from './utils/index';
import "./index.scss";


const Tree = (props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        children,//modal子节点
        autoExpandParent = true,//是否自动展开父节点
        blockNode = false,//是否节点占据一行
        checkable = false,//节点前添加 Checkbox 复选框
        defaultCheckedKeys,//默认选中复选框的树节点
        defaultExpandAll,//默认展开所有树节点
        defaultExpandedKeys,//默认展开制定的树节点
        defaultExpandParent = true,//默认展开父节点
        disabled,//将树禁用
        treeData
    } = props;

    const [flattenData, setFlattenData] = useState([]);//定义flatten数据
    const [keyEntities,setKeyEntities]=useState({});//定义flatten数据

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("tree", customizePrefixCls);

    useEffect(() => {
        if (treeData) {
            const flattenData = flattenTreeData(treeData);//平铺数组
            const entitiesMap=convertDataToEntities(treeData);//转化数据
            setFlattenData(flattenData);
            setKeyEntities(entitiesMap.keyEntities);
        
        }
    }, [treeData]);

    console.log(keyEntities);

    return <div className={classNames(prefixCls, className)}>
        {
            treeData.map((item, index) => <div
                className={classNames(`${prefixCls}-treenode`)}
                style={style}
            >
                {/* <Indent level={level} isStart={item.isStart[0]} isEnd={item.isEnd[0]} prefixCls={prefixCls}/>
                <span>
                    {item.title}
                </span> */}
            </div>)
        }
    </div>
}

export default Tree;