import React, { useContext, useState, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import Button from '../ButtonBase';
import Icon from '../components/icon';
import { Fade } from '../Animate';
import "./index.scss";

const Input = (Props) => {

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
        suffix,//后缀
        enterButton,//是否有确认按钮，可设为按钮文字。
        onChange,//input change事件
        onSearch,//按下搜索按钮的回调
        loading,//loading加载状态
        onKeyDown,//按键事件
        allowClear,//是否允许清除
        onClear,//点击清除按钮的回调
        onPressEnter,//回车的回调
        maxLength,//输入框输入的最大长度
        type = "text",
        disabled,//禁用
        prefix,//前缀
        component:Component="input",
        rows,
        ...restProps
    } = Props;

    console.log(rows);

    const [focused, setFocused] = useState(false);//是否触发焦点

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("input", customizePrefixCls);

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
            onChange(e)
        }
        setValue(e.target.value);
    }, []);

    const handleSearch = useCallback((e) => {//点击搜索
        if (loading) {
            return;
        }

        if (onSearch) {
            onSearch(value, e);
        }
    }, [value]);

    const handleKeyDown = useCallback((e) => {//键盘按下回车事件
        if (onKeyDown) {
            onKeyDown(e.keyCode, e);
        }
        if (e.keyCode === 13) {
            if (onPressEnter) {
                onPressEnter(e)
            }
            handleSearch(e);
        }
    }, [value]);

    const handleClearValue = useCallback((e) => {
        if (!value) {
            return;
        }
        if (onClear) {
            onClear("", e);
        }
        setValue("");
        if (onChange) {
            onChange(e);
        }

    }, [value]);

    const sizeObj = {
        "small": "24px",
        "large": "40px",
        "default": "32px",
        undefined: "32px"
    }

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

                {
                    prefix && <span className={classNames(`${prefixCls}-prefix`)}>
                        {prefix}
                    </span>
                }

                <Component
                    type={type}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={value ? value : ""}
                    maxLength={maxLength}
                    disabled={disabled}
                    rows={rows}

                />

                

                {
                    (suffix || allowClear)  && <span className={classNames(`${prefixCls}-suffix`)}>
                        {allowClear && <Fade in={value ? true : false}><Icon name="close-circle" style={{ fontSize: 16 }} onClick={(e) => handleClearValue(e)} /></Fade>}
                        {suffix}
                    </span>
                }

                {
                    enterButton && <span className={classNames(
                        `${prefixCls}-enterButton`,
                        {
                            [`${prefixCls}-disabled`]: disabled,
                        }
                    )}>
                        <Button disabled={disabled} loading={loading} type="primary" style={{ height: sizeObj[size] }} onClick={(e) => handleSearch(e)}>
                            {
                                enterButton === true ?
                                    <Icon name="find" style={{ fontSize: "16px" }} /> :
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