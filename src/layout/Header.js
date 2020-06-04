import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';
import "./index.scss";

const Header = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("Layout-header", customizePrefixCls);
    
    return (
        <Paper 
            component="header"
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

export default Header;