import React,{Fragment} from 'react';
import { classNames } from './../helper/className';
import { CSSTransition,SwitchTransition  } from 'react-transition-group';
import "./../styles/ripple.scss";
import "./../styles/ripple.css";
 

interface CircleRippleProps{
    mergeStyle?:any,
    color?:any,
    opacity?:any
}

const CircleRipple:React.FunctionComponent<CircleRippleProps>=(CircleRippleProps)=>{

    const {
        mergeStyle,
        color,
        opacity
    }=CircleRippleProps;

    const styles={...mergeStyle,color,opacity}

    const classes=classNames("wonderful-circle-ripple")

    return(
        <SwitchTransition>
            <CSSTransition classNames="ripple" in={true} timeout={200}>
                <div className={classes} style={styles}></div>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default CircleRipple;