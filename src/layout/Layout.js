import React, { forwardRef, useContext, useState,useRef, useCallback, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Paper from '../Paper';
import Sider from './Sider';
import "./index.scss";

const Layout = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        style
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("Layout", customizePrefixCls);

    const [hasSider,setHasSider]=useState(false);

    const isHasSider=useCallback(()=>{
        React.Children.map(children, child => {
            if(child.type===Sider){
                setHasSider(true);
            }     
        })
    },[hasSider]);

    useEffect(()=>{
        isHasSider();
    },[])

    return (
        <Paper
            component="section"
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-hasSider`]:hasSider
                    }
                )
            }
            style={style}
            ref={ref}
        >
            {
                React.Children.map(children, child => {
                     
                    return React.cloneElement(child, {
                        keyProp: child.key
                    })
                })
            }
        </Paper>
    )
})

export default Layout;