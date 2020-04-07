import React,{Fragment,useState} from 'react';
import { classNames } from './../helper/className';
import { CSSTransition,SwitchTransition,Transition } from 'react-transition-group';
import "./../styles/ripple.scss";
import "./../styles/ripple.css";
 

interface CircleRippleProps{
    mergeStyle?:any,
    color?:any,
    opacity?:any
}

const CircleRipple:React.FunctionComponent<CircleRippleProps>=(CircleRippleProps)=>{

    const [ rippleEntering,setRippleEntering ]=useState(false);

    const {
        mergeStyle,
        color,
        opacity
    }=CircleRippleProps;

    const styles={...mergeStyle,color,opacity}

    const classes=classNames("wonderful-circle-ripple",{
        "ripple-entering":rippleEntering
    });

    function handleEnter(){
        setRippleEntering(true);
        console.log("handleEnter")
    }

    return(
        <Transition
            onEnter={()=>console.log("circle")}
 
            timeout={1000}
        >
            <div className={classes} style={styles}></div>
        </Transition>
    )
}

export default CircleRipple;