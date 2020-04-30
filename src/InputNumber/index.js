import React, { useContext, useState, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import "./index.scss";

const InputNumber = (Props) => {

    const {
        prefixCls: customizePrefixCls,
        border,//是否有边框
        className,
        defaultValue,//默认值
        value: valueProps,//值
        onFocus,//foucs事件
        onBlur,//离开焦点事件
        placeholder,//input placeholder
        size,//输入框大小
        style,//input样式
        enterButton,//是否有确认按钮，可设为按钮文字。
        onChange,//input change事件
        onSearch,//按下搜索按钮的回调
        loading,//loading加载状态
        onKeyDown,//按键事件
        onPressEnter,//回车的回调
        maxLength,//输入框输入的最大长度
        type = "text",
        disabled,//禁用
        min,
        max,
        step=1,
        formatter=(e)=>e,
        ...restProps
    } = Props;

    const [focused, setFocused] = useState(false);//是否触发焦点

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("input-number", customizePrefixCls);

    const handleFocus = useCallback((...props) => {//input 焦点focus事件
        if (onFocus) {
            onFocus(...props)
        }
        setFocused(true)
    }, [])

    const handleBlur = useCallback((...props) => {//input 移除焦点
        if (onBlur) {
            onBlur(...props)
        }
        setFocused(false)
    }, []);

    const handleChange = useCallback((e) => {//input框change事件
        if (onChange) {
            onChange(e.target.value,e)
        }
        setValue(e.target.value);
    }, []);

    const handleKeyDown = useCallback((e) => {//键盘按下回车事件
        if (onKeyDown) {
            onKeyDown(e.keyCode, e);
        }
        if (e.keyCode === 13) {
            if (onPressEnter) {
                onPressEnter(e)
            }
        }
    }, [value]);
 

    const sizeObj = {
        "small": "24px",
        "large": "40px",
        "default": "32px",
        undefined: "32px"
    }

    console.log(formatter(value))

    return (
        <div style={style} className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-active`]: focused,
                    [`${prefixCls}-border`]: border,
                    [`${prefixCls}-${size}`]: size,
                    [`${prefixCls}-disabled`]: disabled,
                }
            )
        } >
            <div className={classNames(`${prefixCls}-inputwrapper`, {
                [`${prefixCls}-disabled`]: disabled,
            })}>

                <input
                    type={type}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={value ?  formatter(value): ""}
                    maxLength={maxLength}
                    disabled={disabled}
                    max={max}
                    min={min}
                    step={step}
                />

            </div>
        </div>
    )
}

export default InputNumber;