import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';
import "./index.scss";

const Footer = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("Layout-footer", customizePrefixCls);
    
    return (
        <Paper 
            component="footer"
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

export default Footer;