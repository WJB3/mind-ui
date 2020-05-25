import React,{useState} from 'react';
import { classNames } from './../components/helper/className';
import { Transition } from 'react-transition-group';
import "./index.scss";
 

const Ripple=React.forwardRef((props,ref)=>{

    const {
        mergeStyle,
        color,
        backgroundColor,
        opacity,
        ...other
    }=props;

    const styles={...mergeStyle,backgroundColor,opacity}

    const [ rippleEntering,setRippleEntering ]=useState(false);
    const [ rippleExiting,setRippleExiting ]=useState(false);

    function handleEnter(){
        setRippleEntering(true);
    }

    function handleExit(){
        setRippleExiting(true);
    }

    const classes=classNames(
        `${globalPrefix}-${componentName}`,
        rippleEntering?`${globalPrefix}-${componentName}-entering`:"",
        rippleExiting?`${globalPrefix}-${componentName}-exiting`:""
    )

    return (
        <Transition
            onEnter={handleEnter}
            onExit={handleExit}
            exit
            enter
            timeout={500}
            unmountOnExit
            {...other}
        >
                <span
                    className={
                        classes
                    }
                    style={styles}
                />
        </Transition>
        
    )
});

export default Ripple;