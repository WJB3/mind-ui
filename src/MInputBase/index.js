import React from 'react';
import SizeContext  from '../ConfigContext/SizeContext';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import useControlled from '../_utils/useControlled';
import useForkRef from '../_utils/useForkRef';
import PropTypes from 'prop-types';

const InputBase=React.forwardRef((props,ref)=>{

    const contextSize=React.useContext(SizeContext);

    const {
        prefixCls:customizePrefixCls,
        'aria-describedby': ariaDescribedby,
        autoComplete,
        autoFocus,
        className,
        defaultValue,
        disabled,
        fullWidth = false,
        id,
        inputComponent:InputComponent="input",
        inputProps:inputPropsProp={},
        inputRef:inputRefProp,
        margin,
        multiline=false,
        name,
        onBlur,
        onChange,
        onClick,
        onFocus,
        onKeyDown,
        onKeyUp,
        placeholder,
        readOnly,
        type = 'text',
        value:valueProp,
        size=contextSize,
        ...other
    }=props;

    const { getPrefixCls }=React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("inputBase", customizePrefixCls);
    
    const value=inputPropsProp.value!=null?inputPropsProp.value:valueProp;

    const [,,isControlled]=useControlled({
        controlled:valueProp,
        default:defaultValue
    });

    const inputRef=React.useRef();

    const [focused,setFocused]=React.useState(false);

    const handleClick=(event)=>{
        if(inputRef.current && event.currentTarget===event.target){
            inputRef.current.focus();
        }

        if(onClick){
            onClick(event);
        }
    }

    const handleBlur=(event)=>{
        if(onBlur){
            onBlur(event);
        }

        setFocused(false);
    }

    const handleFocus=(event)=>{
        if(onFocus){
            onFocus(event);
        }

        setFocused(true);
    }

    const handleChange=(event,...args)=>{

        if(!isControlled){
            const element=event.target||inputRef.current;


        }

        if(onChange){
            onChange(event,...args);
        }
    }

    const handleInputRef=useForkRef(inputRef,inputRefProp);

    return (
        <div 
            className={
                classNames(
                    className,
                    prefixCls,
                    {
                        [`${prefixCls}-fullWidth`]:fullWidth,
                    }
                )
            }
            onClick={handleClick}
            ref={ref}
            {...other}
        >
            <InputComponent 
                aria-describedby={ariaDescribedby}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                id={id}
                name={name}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                ref={handleInputRef}
            />
        </div>
    )

});

export default InputBase;
