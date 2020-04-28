import React, { useContext, useState,useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import "./index.scss";
 
const Input = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        border,//是否有边框
        className,
        defaultValue,//默认值
        value:valueProps,//值
        onFocus,//foucs事件
        onBlur,//离开焦点事件
        placeholder,//input placeholder
        size,//输入框大小
        style,//input样式
        suffix,//后缀
        ...restProps
    } = Props;

    const [focused,setFocused]=useState(false);//是否触发焦点

    const [value,setValue]=useControlled({
        controlled:valueProps,
        default:defaultValue
    });

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input",customizePrefixCls);

    const handleFocus=useCallback((...props)=>{
        if(onFocus){
            onFocus(...props)
        }
        setFocused(true)
    },[])

    const handleBlur=useCallback((...props)=>{
        if(onBlur){
            onBlur(...props)
        }
        setFocused(false)
    },[])
  
    return (
        <div style={style} className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-active`]:focused,
                    [`${prefixCls}-border`]:border,
                    [`${prefixCls}-${size}`]:size,
                }
            )
        } >
            <div className={classNames(`${prefixCls}-inputwrapper`)}>
                <input 
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )
}

export default Input;