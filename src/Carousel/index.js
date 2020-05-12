import React, { useCallback,useState,cloneElement,useRef,forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import ReactDOM from 'react-dom';
import setRef from '../_utils/setRef';

import "./index.scss";

const Carousel = forwardRef((props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProps,
        style,
        ...restProps
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);
    //获取当前可视区容器宽度
    const prefixCls=getPrefixCls("carousel",customizePrefixCls);
     
    const classes = classNames(prefixCls,className);
    

    return (
        <div className={classes} {...restProps} style={style} ref={ref}>
             
        </div>
    )
});

export default Carousel;