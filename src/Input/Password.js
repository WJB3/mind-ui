import React, { useContext, useState, useCallback } from 'react';
import { classNames } from '../components/helper/className';
import Input from './Input';
import Icon from '../components/icon';
import { ConfigContext } from '../ConfigContext';

import "./index.scss";
 
const Password = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        visibilityToggle=false,
        ...restProps
    } = Props;

    const [type,setType]=useState("password");

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input-password",customizePrefixCls);

    const toggleVisible=useCallback((e)=>{
        if(type==="password"){
            setType("text");
        }else{
            setType("password");
        }
    },[type]);
 
    return (
        <Input  
            type={type} 
            suffix={visibilityToggle && <Icon name={type==="password"?"eye-off":"eye"} style={{fontSize:16}} onClick={(e)=>toggleVisible(e)}/>} 
            className={classNames(prefixCls)} {...restProps} 
        />
    )
}

export default Password;