import React from 'react';
import { classNames } from './../helper/className';
import "./../styles/icon.scss";
import "./importIcons";
import { typeEnum } from './../color';

interface IconProps{
    name?:string,
    color?:string
}

const Icon:React.FunctionComponent<IconProps>=(IconProps)=>{

    const {
        name,
        color
    }=IconProps;

    const classes=classNames("icon","wonderful-icon")

    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否是类型

    return(
        <i  className={classes} style={{color:index===-1?color:""}}>
            <svg width={"1em"} height={"1em"} fill={"currentcolor"} >
                <use xlinkHref={`#${name}`}></use>
            </svg>
        </i>
    )
}

export default Icon;