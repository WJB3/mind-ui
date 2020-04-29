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
        dot,
        color,
        status,
        text,
        ...restProps
    } = Props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("badge", customizePrefixCls);

    const hasStatus=React.useCallback(()=>{
        return !!status || !!color;
    },[status])

    const isZero = React.useCallback(() => {
        const numberedDisplayCount = getNumberedDisplayCount();
        return numberedDisplayCount === '0' || numberedDisplayCount === 0;
    },[]);

    const isDot=React.useCallback(()=>{
        return (dot && !isZero()) || hasStatus();
    },[dot])

    const getNumberedDisplayCount =React.useCallback(() => {
        const displayCount =
          count  > overflowCount ? `${overflowCount}+` : count;
        return displayCount ;
    });

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

    const getBadgeClassName = (prefixCls ) => {
        return classNames(className, prefixCls, {
          [`${prefixCls}-status`]: hasStatus(),
          [`${prefixCls}-not-a-wrapper`]: !children
        });
    }

    const renderBadgeNumber=({count,prefixCls})=>{
        const dot = isDot();
       
        if (!children && hasStatus()) {
      
            return (
              <span
                className={getBadgeClassName(prefixCls)}
              >
                <span   className={classNames(`${prefixCls}-status-dot`,{
                    
                    [`${prefixCls}-${status}`]:status,
                   
                })} />
                <span  className={`${prefixCls}-status-text`}>
                  {text}
                </span>
              </span>
            );
        }
    
        return <ScrollNumber 
            count={getNumberedDisplayCount()}
            style={style}
            className={classNames(
                {
                    [`${prefixCls}-dot`]: dot,
                    [`${prefixCls}-count`]: !dot,
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
            {(!!count || showZero ||isDot()) && renderBadgeNumber({...Props,prefixCls})}
        </span>
    )
}

export default Badge;