import React, { useState, useCallback, useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import RadioGroupContext from './RadioGroupContext';
import transformString from './../_utils/transformString';
import Radio from './Radio';
import "./index.scss";

const componentName = "RadioGroup";

const RadioGroup = React.forwardRef((props, ref) => {
    const {
        Component = "div",
        disabled,
        children,
        value:valueProp,
        name="radio-group",
        onChange,
        options
    } = props;

    const classes=classNames(
        `${globalPrefix}-${componentName}`,
        disabled?"disabled":""
    );

    const optionsChildren=React.useRef([]);

    const [value, setValue] = useState(transformString(valueProp));

    const handleChangeRadio=React.useCallback((event)=>{
        setValue(event.target.value);
        if(onChange){
            onChange(event,event.target.value)
        }
    },[])

    const setOptionChildren=React.useCallback(()=>{
        if(options && options.length>0){
            optionsChildren.current=options.map(option=>{
                if(typeof option==="string"){
                    return <Radio value={option} key={`${option}_key`}>
                        {option}
                    </Radio>
                }
                return <Radio 
                    value={option.value}
                    disabled={option.disabled}
                    key={option.key?option.key:`${option.label}_key`}
                    {...option}
                >{option.label}</Radio>
            })
        }
    },[])

    setOptionChildren();

    useEffect(() => {
        
    }, []);

    return (
        <RadioGroupContext.Provider value={{ name, onChange: handleChangeRadio, value }}>
            <Component 
                className={classes}
            >
                {optionsChildren.current.length===0 ? children : optionsChildren.current}
            </Component>
        </RadioGroupContext.Provider>
    )
})

export default RadioGroup;