import React, { useContext, useState,useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import Button from '../ButtonBase';
import Icon from '../components/icon';
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
        enterButton,//是否有确认按钮，可设为按钮文字。
        onChange,//input change事件
        onSearch,
        ...restProps
    } = Props;

    const [focused,setFocused]=useState(false);//是否触发焦点

    const [value,setValue]=useControlled({
        controlled:valueProps,
        default:defaultValue
    });

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input",customizePrefixCls);

    const handleFocus=useCallback((...props)=>{//input 焦点focus事件
        if(onFocus){
            onFocus(...props)
        }
        setFocused(true)
    },[])

    const handleBlur=useCallback((...props)=>{//input 移除焦点
        if(onBlur){
            onBlur(...props)
        }
        setFocused(false)
    },[]);

    const handleChange=useCallback((e)=>{//input框change事件
        if(onChange){
            onChange(e)
        }
        setValue(e.target.value); 
    },[]);

    const handleSearch=useCallback((e)=>{//点击搜索
        if(onSearch){
            onSearch(value,e);
        }
    },[value]);

    const  sizeObj={
        "small":"24px",
        "large":"40px",
        "default":"32px",
        undefined:"32px"
    }
  
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
                    onChange={handleChange}
                />

                {
                    suffix && <span className={classNames(`${prefixCls}-suffix`)}>
                        {suffix}
                    </span>
                }

                {
                    enterButton && <span className={classNames(`${prefixCls}-enterButton`)}>
                        <Button type="primary" style={{height:sizeObj[size]}} onClick={(e)=>handleSearch(e)}>
                            {
                                enterButton===true?
                                <Icon name="find" style={{fontSize:"16px"}}/>:
                                enterButton
                            }
                        </Button>
                    </span>
                }
            </div>
        </div>
    )
}

export default Input;