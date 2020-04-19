import React from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import "./index.scss";
import useEventCallback from '../_utils/useEventCallback';
import TouchRipple from './TouchRipple';
const componentName="BaseRipple";

const BaseRipple=React.forwardRef((props,ref)=>{

    const {
        Component="span",
        onMouseDown,
        onMouseUp,
        centerRipple=false,
        enabledTouchRipple=true,
        children,
        className,
        disabledTouchRipple=false,//禁用波纹
    }=props;

    const rippleRef=React.useRef(null);

    const classes=classNames(
        `${globalPrefix}-${componentName}`,
        className
    )

    function useRippleHandler(rippleAction,eventCallback,skipRippleAction=disabledTouchRipple){
        return useEventCallback((event)=>{
            if(eventCallback){
                eventCallback(event);
            }
            const ignore=skipRippleAction;
            if(!ignore&&rippleRef.current){
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
        >
            {children}
            {enabledTouchRipple && <TouchRipple ref={rippleRef} center={centerRipple} />}
        </Component>
        
    )
});

export default BaseRipple;