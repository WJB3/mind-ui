import React, { forwardRef, useContext, useState } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useInputControlled from '../_utils/useInputControlled';
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
        textareaStyles,
        onBlur,
        onFocus,
        tabIndex,
        style
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const [active, setActive] = useState(false);
 
    const [value, setValue] = useInputControlled({
        controlled: valueProps,
        default: defaultValue
    });

 
    const prefixCls = getPrefixCls("input", customizePrefixCls);

    const handleFocus = (e) => {//input触发焦点事件
        setActive(true);
        if(onFocus){
            onFocus(e);
        }
    }
    const handleBlur = (e) => {//input离开焦点事件
        setActive(false);
        if(onBlur){
            onBlur(e);
        }
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

    const handleKeyUp=(e)=>{

        const children=event.target.innerHTML;

        if(typeof(event.target.innerHTML)==="string"){//是字符串
            if(onChange){
                onChange(children,event);
                keepLastIndex(event.target);
            }
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
    
    const selectProps={}

    const keepLastIndex=(target)=>{//保持光标移至在后面
        if (window.getSelection) { //ie11 10 9 ff safari
            target.focus(); //解决ff不获取焦点无法定位问题
            var range = window.getSelection(); //创建range
            range.selectAllChildren(target); //range 选择obj下所有子内容
            range.collapseToEnd(); //光标移至最后
        } else if (document.selection) { //ie10 9 8 7 6 5
            var range = document.selection.createRange(); //创建选择对象
            //var range = document.body.createTextRange();
            range.moveToElementText(target); //range定位到obj
            range.collapse(false); //光标移至最后
            range.select();
        }
    }

    if(Component==="div"){
        selectProps.children=value?value:""
        selectProps.contentEditable='true'
        selectProps.suppressContentEditableWarning="true"
        selectProps.onKeyUp=handleKeyUp
    }
    
    return (
        <div style={style} className={classNames(
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
                    className={classNames(`${prefixCls}-input`)}
                    tabIndex={disabled?-1:tabIndex}
                    {...selectProps}
                    // children={value?value:""}
                />

                {
                    (suffix || allowClear) && <span className={classNames(`${prefixCls}-suffix`)}>
                        {allowClear && <Fade in={value ? true : false} unmountOnExit ><Icon name="close-circle" style={{ fontSize: 16, color: "rgba(0,0,0,.4)" }} onClick={(e) => handleClearValue(e)} /></Fade>}
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