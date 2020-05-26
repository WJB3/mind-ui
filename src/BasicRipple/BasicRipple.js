import React,{useContext, useCallback} from 'react';
import { classNames } from './../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import PropTypes from 'prop-types';
import useEventCallback from '../_utils/useEventCallback';
import "./index.scss";
import TouchRipple from './TouchRipple';

const BaseRipple=React.forwardRef((props,ref)=>{

    const {
        component:Component="span",
        prefixCls:customizePrefixCls,
        disabledTouchRipple=false,//禁用波纹
        onMouseDown,
        onMouseUp,
        centerRipple=false,
        children,
        className,
        style,
        color,
        onClick
    }=props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("basicripple", customizePrefixCls);

    const rippleRef=React.useRef(null);

    const classes=classNames(
        prefixCls,
        className
    )

    function useRippleHandler(rippleAction,eventCallback,skipRippleAction=disabledTouchRipple){
      
        return useEventCallback((event)=>{
           
            if(eventCallback){        
                eventCallback(event);
            }
            const ignore=skipRippleAction;
            if(!ignore&&rippleRef.current&&rippleRef.current[rippleAction]){
                rippleRef.current[rippleAction](event)
            }
        })
    }

    const handleMouseDown = useRippleHandler('start', onMouseDown);
    const handleMouseUp = useRippleHandler('stop', onMouseUp);


    return (
        <Component 
            className={classes}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            style={style}
            ref={ref}
        >
            {children}
            {!disabledTouchRipple && <TouchRipple ref={rippleRef} center={centerRipple} color={color} />}
        </Component>
        
    )
});

BaseRipple.propTypes={
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //自定义类名
    className:PropTypes.string,
    //dom元素
    component:PropTypes.string,
    //孩子节点
    children:PropTypes.node,
    //是否禁用ripple
    disabledTouchRipple:PropTypes.bool,
    //是否启动中间扩散波纹
    centerRipple:PropTypes.bool,
    //自定义类名
    style:PropTypes.object,
    //按钮按下时的回调
    onMouseDown:PropTypes.func,
    //离开时的回调
    onMouseUp:PropTypes.func,
    //涟漪的颜色
    color:PropTypes.string,
    //点击回调
    onClick:PropTypes.func
};
export default BaseRipple;