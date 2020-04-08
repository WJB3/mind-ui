import React from 'react';
import { classNames } from './../helper/className';
import Ripple from './../ripple';
import "./../styles/button.scss";
 

interface ButtonProps{
    type?:any,
    size?:any,
    children?:any,
    onClick?:()=>void,
    disabled?:boolean,
    flat?:boolean,
    shape?:string,
    float?:boolean
}

const Button:React.FunctionComponent<ButtonProps>=(ButtonProps)=>{

    const {
        type,
        size,
        children,
        disabled,
        flat,
        shape,
        float
    }=ButtonProps;

    const classes=classNames("wonderful-button",
        "wonderful-rasied-button",
        size?`wonderful-${size}-button`:"wonderful-normal-button",
        type?`wonderful-${type}-button`:"",
        {"wonderful-disabled-button":disabled},
        flat?`wonderful-flat-button`:"",
        shape?`wonderful-${shape}-button`:"",
        float?`wonderful-float-button`:""
    )

    return(
        <button className={classes}>
            <div className={"wonderful-button-wrapper"}>
                <Ripple disabled={disabled}/>
                {children}
            </div>
        </button>
    )
}

export default Button;