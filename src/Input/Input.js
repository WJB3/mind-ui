import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";
 
const Input = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        ...restProps
    } = Props;

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input",customizePrefixCls);
  
    return (
        <div className={
            classNames(prefixCls,className)
        } >
            <div className={classNames(`${prefixCls}-inputwrapper`)}>
                <input />
            </div>
        </div>
    )
}

export default Input;