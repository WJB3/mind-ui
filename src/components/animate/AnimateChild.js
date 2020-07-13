import React, { useEffect } from 'react';
import { classNames } from '../helper/className';
import "./../styles/c_animation.scss";

 
let isAnimate=true;

const AnimateChild =(AnimateChildProps)=>{

    const {
        transitionName
    }=AnimateChildProps;

    useEffect(()=>{
        
    })

    const classes=classNames("wonderful-animate")
  
    return(
        <div 
            className={classes}     
        >
        </div>
    )
}

export default AnimateChild;