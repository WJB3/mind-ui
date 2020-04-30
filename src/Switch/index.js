import React, { useEffect } from 'react';
import { classNames } from './../components/helper/className';
import { globalPrefix } from './../_config/variable';
import BaseRipple from './../BaseRipple';
import useControlled from "./../_utils/useControlled";
import createChainedFunction from './../_utils/createChainedFunction';
import "./index.scss";

const componentName = "Switch";

const Switch = React.forwardRef((props, ref) => {
    const {
        Component = "span",
        disabled = false,
        onChange: onChangeProp,
        defaultChecked,
        checked: checkedProp,
        value,
        checkedChildren,
        unCheckedChildren
    } = props;

    const [isChecked, setChecked] = useControlled({
        controlled: checkedProp,
        default: Boolean(defaultChecked)
    });

    const onChange = createChainedFunction(onChangeProp);

    const handleChangeSwitch = (event) => {
        const checkFlag = event.target.checked;
        setChecked(checkFlag);
        if (onChange) {
            onChange(checkFlag, event);
        }
    }

    useEffect(() => {

    }, []);


    return (
        <Component
            className={
                classNames(
                    `${globalPrefix}-${componentName}`,
                    (checkedChildren || unCheckedChildren) ? `isChildren` : ""
                )
            }
        >

            {
                !!checkedChildren && isChecked && <span
                    className={
                        classNames(
                            `${globalPrefix}-${componentName}-checkedChildren`,
                        )
                    }
                >{checkedChildren}</span>
            }
            <BaseRipple
                className={
                    classNames(
                        `${globalPrefix}-${componentName}-baseRipple`,
                        isChecked ? `isChecked` : "",
                        disabled ? `disabled` : ""
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
                        type="checkbox"
                        className={
                            classNames(
                                `${globalPrefix}-${componentName}-inputWrapper-input`
                            )
                        }
                        onChange={handleChangeSwitch}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        checked={checkedProp}
                        name={name}
                        value={value}
                    />

                    <span className={
                        classNames(
                            `${globalPrefix}-${componentName}-inputWrapper-thumb`,

                        )
                    }>

                    </span>

                </Component>
            </BaseRipple>

            {
                !!unCheckedChildren && !isChecked && <span
                    className={
                        classNames(
                            `${globalPrefix}-${componentName}-unCheckedChildren`,
                        )
                    }
                >{unCheckedChildren}</span>
            }
            <Component
                className={
                    classNames(
                        `${globalPrefix}-${componentName}-fixBlock`,
                        disabled ? `disabled` : "",
                        isChecked ? `isChecked` : ""
                    )
                }
            >

            </Component>
        </Component>
    )
})

export default Switch;