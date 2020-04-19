import React, { useState, useCallback, useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import RadioGroupContext from './RadioGroupContext';
import useControlled from './../_utils/useControlled';
import "./index.scss";

const componentName = "RadioGroup";

const RadioGroup = React.forwardRef((props, ref) => {
    const {
        Component = "span",
        disabled,
        children,
        value:valueProp,
        name="radio-group"
    } = props;

    const classes=classNames(
        `${globalPrefix}-${componentName}`,
        disabled?"disabled":""
    )

    const [value, setValue] = useState(valueProp);

    const handleChangeRadio=React.useCallback((event)=>{
        console.log(event.target.value);
        setValue(event.target.value)
    },[])

    useEffect(() => {

    }, []);

    return (
        <RadioGroupContext.Provider value={{ name, onChange: handleChangeRadio, value }}>
            <Component 
                className={classes}
            >
                {children}
            </Component>
        </RadioGroupContext.Provider>
    )
})

export default RadioGroup;