import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import { Fade } from '../Animate';
import Button from '../ButtonBase';
import Icon from '../components/icon';
import "./index.scss";

const Input = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        placeholder,//占位符 原生input框属性
        border,
        addonAfter,
        addonBefore,
        value: valueProps,
        defaultValue,
        disabled,
        id,
        maxLength,
        suffix,
        prefix,
        size,
        type,
        onChange,
        onKeyDown,
        onPressEnter,
        allowClear,
        onClear,
        enterButton,
        onSearch,
        loading,
        component:Component="input",
        textareaStyles
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const [active, setActive] = useState(false);

    const [value, setValue] = useControlled({
        controlled: valueProps,
        default: defaultValue
    });

    const prefixCls = getPrefixCls("input", customizePrefixCls);

    const handleFocus = (e) => {//input触发焦点事件
        setActive(true);
    }
    const handleBlur = (e) => {//input离开焦点事件
        setActive(false);
    }

    const handleChange = (e) => {//change时间
        if (onChange) {
            onChange(e.target.value, e)
        }
        setValue(e.target.value);
    }

    const handleKeyDown = (e) => {//键盘按下回车事件
        if (onKeyDown) {
            onKeyDown(e.keyCode, e);
        }
        if (e.keyCode === 13) {
            if (onPressEnter) {
                onPressEnter(e)
            }

        }
    };

    const handleClearValue = (e) => {
        if (!value) {
            return;
        }
        if (onClear) {
            onClear("", e);
        }
        setValue("");
        if (onChange) {
            onChange("", e);
        }
    }

    const handleSearch=(e)=>{
        if(onSearch){
            onSearch(value,e);
        }
    }
    
    const sizeObj = {
        "small": "24px",
        "large": "40px",
        "default": "32px",
        undefined: "32px"
    }
    
    return (
        <div  className={classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-focus`]: active,
                [`${prefixCls}-border`]: border,
                [`${prefixCls}-addonAfterExtra`]: !!addonAfter,
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-${size}`]: size,
            }
        )}>

            {addonBefore && <div className={classNames(
                `${prefixCls}-addonBefore`
            )}>
                {addonBefore}
            </div>}

            <div className={classNames(
                `${prefixCls}-inputWrapper`,
                {
                    [`${prefixCls}-disabled`]: disabled
                }
            )}>

                {
                    prefix && <span className={classNames(`${prefixCls}-prefix`)}>
                        {prefix}
                    </span>
                }

                <Component
                    placeholder={placeholder}
                    value={value ? value : ""}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    id={id}
                    maxLength={maxLength}
                    type={type}
                    style={textareaStyles}
                    ref={ref}
                />

                {
                    (suffix || allowClear) && <span className={classNames(`${prefixCls}-suffix`)}>
                        {allowClear && <Fade in={value ? true : false}><Icon name="close-circle" style={{ fontSize: 16, color: "rgba(0,0,0,.4)" }} onClick={(e) => handleClearValue(e)} /></Fade>}
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

            {addonAfter && <div className={classNames(
                `${prefixCls}-addonAfter`
            )}>
                {addonAfter}
            </div>}

        </div>
    )
})

export default Input;