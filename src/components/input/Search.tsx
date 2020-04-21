import React, { useState, useRef } from 'react';
import { classNames } from './../helper/className';
import Input from './Input';
import "./../styles/input.scss";
import Icon from './../icon';
import Button from '../../ButtonBase';
 

interface PageProps{
    enterButton?:any,
    onSearch?:any
}

const Search:React.FunctionComponent<PageProps>=(PageProps)=>{

    const searchRef:any=useRef(null);

    const {
        enterButton,
        onSearch,
        ...props
    }=PageProps;

    function handleSearch(){
 
        if(onSearch){
            onSearch(searchRef && searchRef.current && searchRef.current.value?searchRef.current.value:"")
        }
    }

    return(
        <Input {...props} ref={searchRef} suffix={!enterButton?<Icon name={"find"} size={16}  onClick={handleSearch} />:<Button type="primary" size={"small"} onClick={handleSearch}>{enterButton}</Button>} />
    )
}

 
export default Search;