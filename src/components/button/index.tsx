import React from 'react';
import { classNames } from './../helper/className';
import Ripple from './../ripple';
import "./../styles/button.scss";

export enum ButtonType{
    PRIMARY="primary",
    DANGER="danger",
    WARNING="warning"
}

export enum ButtonSize{
    SMALL="small",
    DEFAULT="default",
    LARGE="large"
}

interface ButtonProps{
    type?:ButtonType,
    size?:ButtonSize,
    children?:any,
    onClick?:()=>void
}

const Button:React.FunctionComponent<ButtonProps>=(ButtonProps)=>{

    const {
        type,
        size,
        children,
        onClick
    }=ButtonProps;

    const classes=classNames("wonderful-button","wonderful-raised-button",`wonderful-${type}-button`)

    return(
        <button className={classes}>
            <div className={"wonderful-button-wrapper"}>
                <Ripple />
                {children}
            </div>
        </button>
    )
}

export default Button;