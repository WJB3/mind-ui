import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { throttle, scrollTo, getScroll } from '../_utils/reactUtils';
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
        ...restProps
    } = Props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("badge", customizePrefixCls);

    return (
        <span className={
            classNames(prefixCls, className)
        }>
            {children}
            {count && <sup className={
                classNames(`${prefixCls}-count`)
            }></sup>}
        </span>
    )
}

export default Badge;