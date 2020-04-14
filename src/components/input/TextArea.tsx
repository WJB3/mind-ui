import React, { useState, useEffect } from 'react';
import { classNames } from './../helper/className';
import "./../styles/input.scss";

interface PageProps{
    
}

const TextArea:React.FunctionComponent<PageProps>=(PageProps)=>{

    const {
        ...props
    }=PageProps;

    const classes = classNames("wonderful-textarea")

    return(
        <textarea className={classes}/>
    )
}

export default TextArea;