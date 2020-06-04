import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';
import "./index.scss";

const Content = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        style
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("Layout-content", customizePrefixCls);
    
    return (
        <Paper 
            component="main"
            className={
                classNames(
                    prefixCls,
                    className
                )
            }
            ref={ref}
            style={style}
        >
            {
                children
            }
        </Paper>
    )
})

export default Content;