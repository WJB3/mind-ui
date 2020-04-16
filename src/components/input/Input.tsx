import React, { useState, useMemo } from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import "./../styles/input.scss";


interface Props {
    onFocus?: any,
    onBlur?: any,
    placeholder?: any,
    maxLength?: number,
    float?: boolean,//placeholder浮动
    stylize?: string,
    size?: string,
    onChange?: any,
    fullWidth?: boolean,
    type?: string,
    suffix?: any,
    visibilityToggle?:boolean,
    prefix?:any,
    allowClear?:any
}

const Input: React.FunctionComponent<Props> = React.forwardRef((Props, ref) => {

    const {
        onFocus,
        onBlur,
        placeholder = "",
        maxLength,
        float,
        stylize,
        size,
        onChange,
        fullWidth,
        type,
        suffix,
        visibilityToggle=true,
        prefix,
        allowClear
    } = Props;

    const [focus, setFocus] = useState(false);
    const [floatLabel, setFloatLabel] = useState(float);
    const [inputValue, setInputValue] = useState("");

    function handleFocus(...props: any) {
        setFocus(true);
        if (float) {
            setFloatLabel(false);
        }
        if (onFocus) {
            onFocus(...props);
        }
    }

    function handleBlur(...props: any) {
        setFocus(false);
        if (float) {
            setFloatLabel(true);
        }
        if (onBlur) {
            onBlur(...props);
        }
    }

    function handleChange(...props: any) {
        setInputValue(props[0].target.value);

        if (onChange) {
            onChange(props[0])
        }
    }

    const classname = classNames(
        `${prefixClassname}-input-container`,
        focus ? `${prefixClassname}-input-is_focus` : "",
        float ? "has_float_label" : "",
        stylize && stylize !== "normal" ? `stylize-${stylize}` : "",
        size && size !== "normal" ? `${prefixClassname}-input-size-${size}` : "",
        fullWidth ? `${prefixClassname}-input-fullWidth` : "",
        inputValue ? `has-value` : ""
    );

    return (
        <div className={classname}>

            {float && <div className={classNames(`${prefixClassname}-input-float-label`, floatLabel ? "has_label" : "")}>{placeholder}</div>}

            <div className={classNames(`${prefixClassname}-input-wrapper`)}>

                {
                    !!prefix  && <div className={classNames(`${prefixClassname}-input-wrapper-prefix`)}>{suffix}</div>
                }

                <input
                    className={classNames(`${prefixClassname}-input-wrapper-standInput`)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={float ? "" : placeholder}
                    maxLength={maxLength}
                    type={type}
                />

                {
                    !!suffix && visibilityToggle && <div className={classNames(`${prefixClassname}-input-wrapper-suffix`)}>{suffix}</div>
                }
            </div>



        </div>
    )
})

export default Input;