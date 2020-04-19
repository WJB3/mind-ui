import React from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import useIsFocusVisible from "./../_utils/useIsFocusVisible";
import useEventCallback from './../_utils/useEventCallback';
import useForkRef from './../_utils/useForkRef';
import Ripple from './../components/ripple';
import "./index.scss";
const componentName="BaseClick";

const BaseClick=React.forwardRef(function BaseClick(props,ref){
    const {
        component="div",
        buttonRef:buttonRefProp,
        //onBlur,//大部分html标签包括div上有此事件对象失去焦点时发生
        onClick,//大部分html标签包括div点击事件在对象被点击时发生，鼠标按下事件之后又发生了鼠标放开事件时才发生的。
        onMouseDown,//mousedown,
        onMouseLeave,
        onMouseUp
    }=props;

    const buttonRef=React.useRef(null);

    const [ focusVisible,setFocusVisible ]=React.useState(false);

    function useRippleHandler(rippleAction,eventCallback,skipRippleAction=disableTouchRipple){
        return useEventCallback((event)=>{
            if(eventCallback){
                eventCallback(event)
            }
            const ignore=shipRippleAction;
            if(!ignore&&rippleRef.current){
                rippleRef.current[rippleAction](event);
            }
            return true;
        })
    }

    const handleMouseDown=useRippleHandler('start',onMouseDown);
    const handleMouseLeave=useRippleHandler('stop',(event)=>{

    });
    const handleMouseUp=useRippleHandler("stop",onMouseUp);

    let ComponentProp=component;

    const handleUserRef=useForkRef(buttonRefProp,ref);
    const handleOwnRef=useForkRef()

    const handleRef=useForkRef();

    return (
        <ComponentProp
            className={
                classNames(`${globalPrefix}-${componentName}`)
            }
            onClick={onClick}//当被点击时
            onMouseDown={handleMouseDown}//当鼠标被按下时
            onMouseLeave={handleMouseLeave}//当鼠标离开该元素时触发
            onMouseUp={handleMouseUp}//当鼠标离开后
            ref={handleRef}
        >
            { children }
            {
                enableTouchRipple && <Ripple />
            }
        </ComponentProp>
    )

})

export default BaseClick;