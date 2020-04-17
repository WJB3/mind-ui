import React, { useRef, useState, useEffect } from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import Ripple from './../ripple';
import "./../styles/radio.scss";
import { RadioContext } from './Context';
const component = "radio";

interface Props {
    children?: any,
    onChange?: any,//切换按钮状态的回调
    disabled?: boolean,//是否禁用
    defaultChecked?: boolean,//默认是否选中
    value?: "",//radio的value值,
    checked?: boolean//指定当前是否选中,
    className?:string,//添加类名
    isGroup?:boolean,//是否是radio组
    defaultGroupValue?:any
    groupValue?:any,
    groupChange?:any,
    style?:any
}

const Radio: React.FunctionComponent<Props> = (Props) => {

    const {
        children,
        onChange,
        disabled,
        defaultChecked = false,
        value,
        checked = false,
        className,
        isGroup=false,
        defaultGroupValue=null,
        groupValue=null,
        groupChange=false,
        style
    } = Props;
     
    const getRef: any = useRef(null);
    const inputRef: any = useRef(null);

    function getChecked(){
     
        if(!isGroup){
            return checked || defaultChecked;
        }
        if(isGroup){
            return groupValue===value||defaultGroupValue===value;//当前value
        }
    }

    const [stateChecked, setStateChecked] = useState(getChecked());

    function handleMouseDown(event: any) {
        
        if (disabled) {
            return;
        }
        getRef.current.handleMouseDown(event);
    }


    function handleMouseUp(event: any) {
     
        if (disabled) {
            return;
        }
        getRef.current.handleMouseUp(event);
    }

    function handleClick() {
        if (disabled) {
            return;
        }
        if(groupChange){
            groupChange(value,!stateChecked);
            return ;
        }

        if (onChange) {
            onChange(!stateChecked)
        }

        setStateChecked(!stateChecked);
    }


    const classes = classNames(
        `${prefixClassname}-${component}`,
        disabled ? 'radio-disabled' : "",
        className
    );

    useEffect(() => {
        if(isGroup){
            setStateChecked(getChecked())
        }
    })

    return (

        <div className={classes} style={style} onClick={handleClick} onMouseDown={(event) => handleMouseDown(event)} onMouseUp={(event) => handleMouseUp(event)} >

            <input type="radio" checked={stateChecked} onChange={() => {}} ref={inputRef} value={value} />

            <div className={classNames(`${prefixClassname}-${component}-wrapper`, stateChecked ? `checked-radio` : "")} >
                <div className={classNames(
                    `${prefixClassname}-${component}-icon`,
                    disabled ? 'radio-disabled' : ""
                )}>
                    <Ripple isStopPropagation disabled={disabled} ref={getRef} center rippleStyle={{ width: "48px", height: "48px", top: "-12px", left: "-12px", position: "absolute" }} onClick={handleClick} />
                    <svg viewBox="0 0 24 24" className={classNames(
                        `${prefixClassname}-${component}-icon-uncheck`,
                        `${prefixClassname}-${component}-icon-svg`
                    )} ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                    <svg viewBox="0 0 24 24" className={classNames(
                        `${prefixClassname}-${component}-icon-checked`,
                        `${prefixClassname}-${component}-icon-svg`
                    )} ><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                </div>
                <div className={classNames(
                    `${prefixClassname}-${component}-label`,
                    disabled ? 'radio-disabled' : ""
                )} >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Radio;