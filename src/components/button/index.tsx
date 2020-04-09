import React from 'react';
import { classNames } from './../helper/className';
import Ripple from './../ripple';
import Icon from './../icon';
import "./../styles/button.scss";
 

interface ButtonProps{
    type?:any,
    size?:any,
    children?:any,
    onClick?:()=>void,
    disabled?:boolean,
    flat?:boolean,
    shape?:string,
    float?:boolean,
    icon?:string,
    iconStyle?:object
}

const Button:React.FunctionComponent<ButtonProps>=(ButtonProps)=>{

    const {
        type,
        size,
        children,
        disabled,
        flat,
        shape,
        float,
        icon,
        iconStyle
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
                {!icon?children:<Icon name={icon} style={iconStyle}/>}
            </div>
        </button>
    )
}

export default Button;