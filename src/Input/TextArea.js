import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import Input from './Input';
import { ConfigContext } from '../ConfigContext';
 
import "./index.scss";
 
const TextArea = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        ...restProps
    } = Props;

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input-textarea",customizePrefixCls);
 
    return (
        <Input  component={"textarea"} className={classNames(prefixCls)} {...restProps} />
    )
}

export default TextArea;