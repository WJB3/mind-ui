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
        component:Component="span",
        ellipsis
    } = props;

    let index=Object.values(typeEnum).findIndex(item=>item===color);//判断是否颜色类型

    let isSingleLine=typeof ellipsis==="boolean";

    let multipleLine=typeof ellipsis==="object"?ellipsis.rows:0;

    let isExpand=typeof ellipsis==="object"?ellipsis.expandable:false;

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
                        isSingleLine?`${globalPrefix}-${componentName}-sing-line`:"",
                        multipleLine?`${globalPrefix}-${componentName}-multiple-line`:""
                    )
                }
                style={{WebkitLineClamp:multipleLine,color:index===-1?color:"",...style}} 
            >
                {!mark && children}
                {mark && <mark>{children}</mark>}

                {isExpand && <span>展开</span>}
            </Component>
            {
                isBr && <br />
            }
        </>
    )
})

export default Base;