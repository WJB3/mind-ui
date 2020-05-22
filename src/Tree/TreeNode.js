import React from 'react';
import "./index.scss";
import Icon from '../components/icon';
import { classNames } from '../components/helper/className';
import {
    convertNodePropsToEventData
} from './utils/index';


const renderSwitcherIcon = () => {
    return <Icon name="arrow-right" />
}

const Indent = ({ level,prefixCls }) => {
    if (!level) {
        return null;
    }


    const list = [];
    for (let i = 0; i < level; i += 1) {
        list.push(
            <span
                key={i}
                className={classNames(
                    `${prefixCls}-indent-unit`
                )}
            />
        );
    }

    return (
        <span aria-hidden="true" className={classNames(
            `${prefixCls}-indent`
        )}>
            {list}
        </span>
    );
};

const TreeNode = (props) => {

    const {
        prefixCls,
        data,
        expanded,
        level
    } = props;

    
    

    const onExpand = e => {
        const {
            onNodeExpand
        } = props;

        onNodeExpand(e, convertNodePropsToEventData(props));
    }

    const renderSwitcher = () => {//渲染icon
        return (
            <span
                onClick={onExpand}
                className={classNames(
                    `${prefixCls}-treenode-switcher`,
                    {
                        [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: true
                    }
                )}>
                {renderSwitcherIcon()}
            </span>
        )
    }

    const renderTitle = () => {//渲染title

        return (
            <span className={classNames(
                `${prefixCls}-treenode-content-wrapper`
            )}>
                <span className={classNames(`${prefixCls}-treenode-title`)}>
                    {data.title}
                </span>
            </span>
        )
    }

    return <div
        className={classNames(`${prefixCls}-treenode`)}
    >
        <Indent level={level}   prefixCls={`${prefixCls}-treenode`} /> 
        {
            renderSwitcher()
        }
        {
            renderTitle()
        }
    </div>
}

export default TreeNode;