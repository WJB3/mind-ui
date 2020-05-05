import React, { useState, useContext, useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import CheckGroupContext from './CheckGroupContext';
import Checkbox from './Checkbox';
import useControlled from '../_utils/useCheckboxControlled';
import "./index.scss";

const CheckboxGroup = React.forwardRef((props, ref) => {

   
    const {
        prefixCls:customizePrefixCls,
        Component = "div",
        disabled,
        children,
        value:valueProp,
        defaultValue,
        name="radio-group",
        onChange,
        options
    } = props;

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("checkbox-group", customizePrefixCls);

    const classes=classNames(
        prefixCls,
        disabled?"disabled":""
    );

    const optionsChildren=React.useRef([]);

    const [value, setValue] = useControlled({
        controlled:valueProp,
        default:[...defaultValue]
    });

    const handleChangeCheckbox=React.useCallback((checked,e)=>{
        let index=value.indexOf(e.target.value);
        
        if(index>-1){//当存在时
            if(checked===false){//当取消
                value.splice(index,1);
            }
        }else{
            if(checked===true){//当取消
                value.push(e.target.value);
            }
        }
        setValue([...value]);
        onChange && onChange(value,e)
        
    },[])

    const setOptionChildren=React.useCallback(()=>{
        if(options && options.length>0){
            optionsChildren.current=options.map(option=>{
                if(typeof option==="string"){
                    return <Checkbox value={option} key={`${option}_key`} disabled={disabled}>
                        {option}
                    </Checkbox>
                }
                return <Checkbox 
                    value={option.value}
                    disabled={option.disabled||disabled}
                    key={option.key?option.key:`${option.label}_key`}
                    {...option}
                >{option.label}</Checkbox>
            })
        }
    },[])

    setOptionChildren();

    useEffect(() => {
        
    }, []);

 

    return (
        <CheckGroupContext.Provider value={{ name, onChange: handleChangeCheckbox, value }}>
            <Component 
                className={classes}
            >
                {optionsChildren.current.length===0 ? children : optionsChildren.current}
            </Component>
        </CheckGroupContext.Provider>
    )
})

export default CheckboxGroup;