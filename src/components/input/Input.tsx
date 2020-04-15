import React, { useState } from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import "./../styles/input.scss";


interface Props {
    onFocus?:any,
    onBlur?:any,
    placeholder?:any,
    maxLength?:number,
    float?:boolean,//placeholder浮动
    stylize?:string
}

const Input: React.FunctionComponent<Props> = React.forwardRef((Props, ref) => {

    const {
        onFocus,
        onBlur,
        placeholder="",
        maxLength,
        float,
        stylize
    } = Props;

    const [focus,setFocus]=useState(false);
    const [floatLabel,setFloatLabel]=useState(float);

    function handleFocus(...props:any){
        setFocus(true);
        if(float){
            setFloatLabel(false);
        }
        if(onFocus){
            onFocus(...props);
        }
    }

    function handleBlur(...props:any){
        setFocus(false);
        if(float){
            setFloatLabel(true);
        }
        if(onBlur){
            onBlur(...props);
        }
    }

    const classname = classNames(
        `${prefixClassname}-input-container`,
        focus?`${prefixClassname}-is_focus`:"",
        float?"has_label":"",
        stylize && stylize!=="normal"?`stylize-${stylize}`:""
    );

    return (
        <div className={classname}>
            { float && <div className={classNames(`${prefixClassname}-input-float-babel`,floatLabel?"has_label":"")}>{placeholder}</div>}
            <div className={classNames(`${prefixClassname}-input-content`)}>
                <input
                    className={classNames(`${prefixClassname}-input-content-standInput`)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={float?"":placeholder}
                    maxLength={maxLength}
                />
                <div>
                    <div className={classNames(`${prefixClassname}-input-content-line`)}></div>
                    <div className={classNames(`${prefixClassname}-input-content-line-focus`,focus?`${prefixClassname}-is_focus`:"")}></div>
                </div>
            </div>

        </div>
    )
})

export default Input;