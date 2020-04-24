import React from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import "./../styles/pager.scss";
 
interface Props{
    deep?:number,
    children?:any,
    circle?:boolean,
    className?:any,
    style?:object
}

const Pager:React.FunctionComponent<Props>=React.forwardRef((Props,ref)=>{

    const {
        deep,
        children,
        circle,
        className,
        style
    }=Props;

    const classes=classNames(
        `${prefixClassname}-pager`,
        deep?`${prefixClassname}-pager-deep-${deep}`:"",
        circle?`${prefixClassname}-pager-circle`:"",
        className
    );

    return(
        <div className={classes} style={style}>
            {children}
        </div>
    
    )
})

export default Pager;