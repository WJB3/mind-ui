import React, { useState } from 'react';
import { classNames } from './../helper/className';
import "./../styles/input.scss";


interface PageProps {
    placeholder?: any,
    size?: any,
    disabled?: boolean,
    prefixIcon?: any,
    suffix?: any,
    type?:string,
    fillWidth?:boolean,
    onChange?:any,
    style?:any,
    errorText?:any,
    prefix?:any,
    maxLength?:number
}

const Input: React.FunctionComponent<PageProps> = React.forwardRef((PageProps,ref) => {

    const {
        placeholder,
        size,
        disabled,
        prefixIcon,
        suffix,
        type="text",
        fillWidth,
        onChange,
        style,
        errorText,
        prefix,
        maxLength
    } = PageProps;
    
    const [focus, setFocus] = useState(false);

    const classes = classNames("wonderful-input",errorText?`wonderful-input__error`:"",fillWidth?`wonderful-input-fillWidth`:"",focus ? `wonderful-input__focus` : "", prefixIcon ? "has-icon" : "", size ? `wonderful-input-${size}` : "")

    function handleFocus() {
        setFocus(true);
    }

    function handleBlur() {
        setFocus(false);
    }

    function handleChange(e:any){
        if(onChange){
            onChange(e)
        }
    }
 
    return (
        <div className={classes} style={style}>

            {!!prefixIcon && <div className={"wonderful-input-icon"}>{prefixIcon}</div>}

            <div className={classNames("wonderful-input-content", "wonderful-text-field")}>
                {
                    !!prefix && typeof (prefix) == "string" && <div className={"wonderful-input-prefix-text"}>{prefix}</div>
                }

                <input
                    className={classNames("wonderful-text-field-input", size ? `input-${size}` : "",disabled ? 'disabled' : "")}
                    onFocus={() => handleFocus()}
                    onBlur={() => handleBlur()}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={type}
                    autoComplete={"off"}
                    ref={ref}
                    maxLength={maxLength}
                />

                {
                    !!suffix && typeof (suffix) == "string" && <div className={"wonderful-input-suffix-text"}>{suffix}</div>
                }

                {
                    !!suffix && React.isValidElement(suffix) && <div className={"wonderful-input-suffix-icon"}>{suffix}</div>
                }

                <div>
                    <div className={classNames("wonderful-input-line", disabled ? 'disabled' : "")}></div>
                    <div className={classNames("wonderful-input-focus-line", focus ? `focus` : "")}></div>
                </div>

                { !!errorText && <div className={classNames("wonderful-help")}>{errorText}</div>}
            </div>
        </div>
    )
})

export default Input;