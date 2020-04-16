import React,{ useState } from 'react';
import { classNames } from './../helper/className';
import { Transition } from 'react-transition-group';
import "./../styles/ripple.scss";
 
interface CircleRippleProps{
    mergeStyle?:any,
    color?:any,
    opacity?:any,
    in?:any,
    backgroundColor?:string
}

const CircleRipple:React.FunctionComponent<CircleRippleProps>=(CircleRippleProps)=>{

    const [ rippleEntering,setRippleEntering ]=useState(false);
    const [ rippleExiting,setRippleExiting ]=useState(false);

    const {
        mergeStyle,
        color,
        backgroundColor,
        opacity,
        ...other
    }=CircleRippleProps;

    const styles={...mergeStyle,backgroundColor,opacity}

    const classes=classNames("wonderful-circle-ripple",{
        "wonderful-ripple-entering":rippleEntering,
        "wonderful-ripple-wrapper-exiting":rippleExiting
    });

    function handleEnter(){
        setRippleEntering(true);
    }

    function handleExit(){
        console.log("handleExit")
        setRippleExiting(true);
    }

    return(
        <Transition
            onEnter={()=>handleEnter()}
            onExit={()=>handleExit()}
            exit
            enter
            timeout={500}
            unmountOnExit
            {...other}
        >
            <div className={classes} style={styles}></div>
        </Transition>
    )
}

export default CircleRipple;