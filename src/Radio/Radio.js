import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import BaseRipple from './../BaseRipple';
import Icon from './../components/icon';
import useControlled from "./../_utils/useControlled";
import useRadioGroup from './useRadioGroup';
import createChainedFunction from './../_utils/createChainedFunction';
import transformString from './../_utils/transformString';
import "./index.scss";

const componentName = "Radio";

const Radio = React.forwardRef((props, ref) => {
    const {
        Component = "span",
        onChange:onChangeProp,
        children,
        disabled,
        defaultChecked,
        checked:checkedProp,
        name:nameProps,
        labelPlacement="right"
    } = props;

    const radioGroup = useRadioGroup();

    let name=nameProps;
    let checked=checkedProp;

    if(radioGroup){
        if (typeof checked === 'undefined') {
            checked = transformString(radioGroup.value) === transformString(props.value);
        }
        if(typeof name==="undefined"){
            name=radioGroup.name;
        }
    }
    
    const [ isChecked, setChecked] = useControlled({
        controlled: checked,
        default: Boolean(defaultChecked)
    });

    const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);

    const handleChangeRadio = (event) => {
        const checkFlag = event.target.checked;
        setChecked(checkFlag);
        if (onChange) {
            onChange(event, checkFlag);
        }
    }

    useEffect(() => {

    }, []);
   

    return (
        <label
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                    disabled?"disabled":"",
                    `${globalPrefix}-${componentName}-labelplacement-${labelPlacement}`
                )
            }
        >
            <BaseRipple
                className={
                    classNames(
                        `${globalPrefix}-${componentName}-radioWrapper`,
                        isChecked ? `checked` : "",
                        disabled?"disabled":""
                    )
                }
                centerRipple
                disabledTouchRipple={disabled}
            >
                <Component
                    className={
                        classNames(
                            `${globalPrefix}-${componentName}-inputWrapper`,
                        )
                    }
                >
                    <input
                        type="radio"
                        className={
                            classNames(
                                `${globalPrefix}-${componentName}-inputWrapper-input`
                            )
                        }
                        onChange={handleChangeRadio}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        checked={checked}
                        name={name}
                        value={transformString(props.value)}
                    />

                    <Icon name={isChecked ? "radio-checked" : "radio-uncheck"} />

                </Component>

            </BaseRipple>
            <Component
                className={
                    classNames(
                        `${globalPrefix}-${componentName}-labelWrapper`
                    )
                }
            >
                {children}
            </Component>
        </label>
    )
})

export default Radio;