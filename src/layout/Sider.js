import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';
import "./index.scss";

const Sider = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("sider", customizePrefixCls);
    
    return (
        <Paper 
            component="aside"
            className={
                classNames(
                    prefixCls,
                    className
                )
            }
            ref={ref}
        >
            {
                children
            }
        </Paper>
    )
})

export default Sider;