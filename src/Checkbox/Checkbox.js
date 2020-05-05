import React, { useContext, useCallback, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import BaseRipple from '../BaseRipple';
import Icon from '../components/icon';
import "./index.scss";
import useControlled from '../_utils/useControlled';
import useCheckboxGroup from './useCheckboxGroup';
import createChainedFunction from './../_utils/createChainedFunction';

const Checkbox = (Props) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        disabled,
        component:Component="span",
        children,
        checked:checkedProps,
        defaultChecked,
        onChange:onChangeProp,
        indeterminate=false,
        ...restProps
    } = Props;

    const checkboxGroup = useCheckboxGroup();

    let checked=checkedProps;
 
    if(checkboxGroup){
        if (typeof checked === 'undefined') {
            checked = checkboxGroup.value?checkboxGroup.value.indexOf(Props.value)>-1?true:false:false
        }
    }

    const { getPrefixCls } = useContext(ConfigContext);

    const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
    
    const [isChecked,setChecked]=useControlled({
        controlled:checked,
        default:Boolean(defaultChecked)
    });

    const onChange = createChainedFunction(onChangeProp, checkboxGroup && checkboxGroup.onChange);

    const handleChange=useCallback((e)=>{
 
        setChecked(e.target.checked);

        onChange && onChange(e.target.checked,e);

    },[isChecked]);

    return (
        <label
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-disabled`]:disabled
                    }
                )
            }
        >
            <BaseRipple
                className={
                    classNames(
                        `${prefixCls}-checkboxWrapper`,
                        {
                            [`${prefixCls}-checked`]:isChecked,
                            ['disabled']:disabled
                        }
                    )
                }
                centerRipple
                disabledTouchRipple={disabled}
            >
                <Component
                    className={
                        classNames(
                            `${prefixCls}-inputWrapper`,
                            {
                                ['disabled']:disabled
                            }
                        )
                    }
                >
                    <input
                        type="checkbox"
                        className={
                            classNames(
                                `${prefixCls}-inputWrapper-input`
                            )
                        }
                        onChange={(e)=>handleChange(e)}
                        disabled={disabled}
                        value={Props.value}
                        checked={isChecked}
                    />

                    <Icon style={{fontSize:22}} name={isChecked?"checkbox-checked":"checkbox-uncheck"} />
                    {indeterminate && !isChecked &&<Icon  style={{fontSize:16}} className={"indeterminate-icon"} name={"checkbox-indeterminate-fill"} />}

                </Component>

            </BaseRipple>
            <Component
                className={
                    classNames(
                        `${prefixCls}-labelWrapper`
                    )
                }
            >
                {children}
            </Component>
        </label>
    )
}

export default Checkbox;