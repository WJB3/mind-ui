import React, { useContext } from 'react';
import { classNames } from '../components/helper/className';
import Input from './Input';
import Icon from '../components/icon';
import { ConfigContext } from '../ConfigContext';
 
import "./index.scss";
 
const Search = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        enterButton,
        ...restProps
    } = Props;

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("input-search",customizePrefixCls);
 
    return (
        <Input enterButton={enterButton} className={classNames(prefixCls)} {...restProps} suffix={!enterButton && <Icon name="find" style={{fontSize:"16px"}}/>}/>
    )
}

export default Search;