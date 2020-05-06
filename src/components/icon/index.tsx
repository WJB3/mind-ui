import React from 'react';
import { classNames } from './../helper/className';
import "./../styles/icon.scss";
import "./importIcons";
import { typeEnum } from './../color';

interface IconProps{
    name?:string,
    color?:string,
    size?:number,
    spin?:boolean,
    bounce?:boolean,
    style?:object,
    className?:any,
    onClick?:any
}

const Icon:React.FunctionComponent<IconProps>=(IconProps)=>{

    const {
        name,
        color,
        size,
        spin,
        bounce,
        style,
        className,
        onClick
    }=IconProps;

    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否颜色类型

    const classes=classNames("wonderful-icon",
        index>-1?`wonderful-icon-${color}`:"",
        spin?"wonderful-icon-spin":"",
        bounce?`wonderful-icon-bounce`:"",
        className?className:""
    )

    function handleClick(e:any){
        if(onClick){
            onClick(e)
        }
    }

    return(
        <i  className={classes} style={{color:index===-1?color:"",fontSize:size?size:"24px",...style}} onClick={(e)=>handleClick(e)}>
            <svg width={"1em"} height={"1em"} fill={"currentcolor"} >
                <use xlinkHref={`#${name}`}></use>
            </svg>
        </i>
    )
}

export default Icon;