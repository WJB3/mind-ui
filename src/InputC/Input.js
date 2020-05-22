import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import "./index.scss";

const Input = forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        placeholder,//占位符 原生input框属性
        border,
        addonAfter,
        addonBefore,
        value:valueProps,
        defaultValue,
        disabled
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const [active, setActive] = useState(false);

    const [value,setValue]=useControlled({
        controlled:valueProps,
        default:defaultValue
    });

    const prefixCls = getPrefixCls("input", customizePrefixCls);

    const handleFocus = (e) => {//input触发焦点事件
        setActive(true);
    }
    const handleBlur = (e) => {//input离开焦点事件
        setActive(false);
    }

    const handleChange=(e)=>{//change时间

    }

    return (
        <div ref={ref} className={classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-focus`]: active,
                [`${prefixCls}-border`]: border,
                [`${prefixCls}-addonAfterExtra`]:!!addonAfter,
                [`${prefixCls}-disabled`]:disabled
            }
        )}>

            {addonBefore && <div className={classNames(
                `${prefixCls}-addonBefore`
            )}>
                {addonBefore}
            </div>}

            <div className={classNames(
                `${prefixCls}-inputWrapper`
            )}>
                <input
                    placeholder={placeholder}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
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