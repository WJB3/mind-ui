import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import Input from './Input';
import { ConfigContext } from '../ConfigContext';
 
import "./index.scss";
 
const Search = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        ...restProps
    } = Props;

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input-search",customizePrefixCls);
 
    return (
        <Input className={classNames(prefixCls)} {...restProps}/>
    )
}

export default Search;