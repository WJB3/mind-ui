import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { throttle, scrollTo, getScroll } from '../_utils/reactUtils';
import ScrollNumber from './ScrollNumber';
import { ConfigContext } from '../ConfigContext';
import { Zoom } from '../Animate';
import "./index.scss";
import Button from '../ButtonBase';





const Badge = (Props) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        count,
        style,
        showZero,
        overflowCount=99,
        ...restProps
    } = Props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("badge", customizePrefixCls);

    const getNumberedDisplayCount = () => {
        const displayCount =
          count  > overflowCount ? `${overflowCount}+` : count;
        return displayCount ;
    };

    const renderDisplayComponent = () => {
        const customNode = count ;
        if (!customNode || typeof customNode !== 'object') {
          return undefined;
        }
        return React.cloneElement(customNode, {
          style: {
            ...(customNode.props && customNode.props.style),
          },
        });
    };

    const renderBadgeNumber=({count,prefixCls})=>{
        return <ScrollNumber 
            count={getNumberedDisplayCount()}
            style={style}
            className={classNames(
                `${prefixCls}-count`,
                {
                    [`${prefixCls}-multiple-words`]:
                        count && count.toString && count.toString().length > 1,
                    
                }
            )}
            displayComponent={renderDisplayComponent()}
        />
    }

    return (
        <span 
           
            className={
                classNames(prefixCls, className,{
                    [`${prefixCls}-not-a-wrapper`]: !children,
                })
            }>
            {children}
            {(!!count || (count===0 && showZero))&& renderBadgeNumber({...Props,prefixCls})}
        </span>
    )
}

export default Badge;