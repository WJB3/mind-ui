import React from 'react';
import "./index.scss";
import Icon from '../components/icon';
import { classNames } from '../components/helper/className';
import {
    getTreeNodeProps,//获取接待你node
    convertNodePropsToEventData
} from './utils/index';


const renderSwitcherIcon=()=>{
    return <Icon name="arrow-right"/>
}


const Indent = ({ level }) => {
    if (!level) {
        return null;
    }

 
    const list = [];
    for (let i = 0; i < level; i += 1) {
        list.push(
            <span
                key={i}
            />
        );
    }

    return (
        <span aria-hidden="true" >
            {list}
        </span>
    );
};



const TreeNode = (props) => {

    const {
        prefixCls,
        data,
        expanded
    }=props;

    const onExpand=e=>{
        const {
            onNodeExpand
        } = props;
        onNodeExpand(e, convertNodePropsToEventData(props));
    }

    const renderSwitcher=()=>{//渲染icon

      
        return (
            <span 
                onClick={onExpand}
                className={classNames(
                    `${prefixCls}-treenode-switcher`,
                    {
                        [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]:true
                    }
            )}>
                {renderSwitcherIcon()}
            </span>
        )
    }

    return <div
            className={classNames(`${prefixCls}-treenode`)}
        >
        {/* <Indent level={keyEntities[item.key].level} isStart={item.isStart[0]} isEnd={item.isEnd[0]} prefixCls={prefixCls} /> */}
        {
            renderSwitcher()
        }
        <span>
            {data.title}
        </span>
    </div>
}

export default TreeNode;