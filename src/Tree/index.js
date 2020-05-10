import React, { useCallback,useState,useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Avatar from '../Avatar';
import "./index.scss";

const Tree = (Props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        children,//modal子节点
        autoExpandParent=true,//是否自动展开父节点
        blockNode=false,//是否节点占据一行
        checkable=false,//节点前添加 Checkbox 复选框
        defaultCheckedKeys,//默认选中复选框的树节点
        defaultExpandAll,//默认展开所有树节点
        defaultExpandedKeys,//默认展开制定的树节点
        defaultExpandParent=true,//默认展开父节点
        disabled,//将树禁用
        
        ...restProps
    } = Props;
 
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("skeleton", customizePrefixCls);

    

   
    return  <div>
        
    </div>
}

export default Tree;