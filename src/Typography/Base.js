import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import { typeEnum } from './../components/color';
import "./index.scss";

const componentName = "Typography-Base";

const Base = React.forwardRef((props, ref) => {
    const {
        children,
        isBr,
        color,
        style,
        disabled,
        mark,
        code,
        underline,
        delete:deleteProp,
        strong,
        component:Component="span"
    } = props;

    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否颜色类型

    return (
        <>
            <Component
                className={
                    classNames(
                        `${globalPrefix}-${componentName}`,
                        index>-1?`${globalPrefix}-${componentName}-${color}`:"",
                        disabled?`${globalPrefix}-${componentName}-disabled`:"",
                        code?`${globalPrefix}-${componentName}-code`:"",
                        underline?`${globalPrefix}-${componentName}-underline`:"",
                        deleteProp?`${globalPrefix}-${componentName}-delete`:"",
                        strong?`${globalPrefix}-${componentName}-strong`:"",
                    )
                }
                style={{color:index===-1?color:"",...style}} 
            >
                {!mark && children}
                {mark && <mark>{children}</mark>}
            </Component>
            {
                isBr && <br />
            }
        </>
    )
})

export default Base;