import React,{ useState, useEffect, useCallback, useMemo } from 'react';
const defaultDelay = 200;
const STATUS_NONE = 'none';
const STATUS_APPEAR = 'appear';
const STATUS_LEAVE = 'leave';

function useAnimate(props:{
    delay?:number;
    className:string
}){
    const {className='',delay=defaultDelay}=props;
    const [ status,setStatus]=useState(STATUS_NONE);
    useEffect(()=>{
        setStatus(STATUS_APPEAR);
    },[]);
    const onLeave=useCallback(()=>{
        setStatus(STATUS_LEAVE);
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve()
            },delay)
        })
    },[]);

    const onRemove=useCallback(()=>{
        setStatus(STATUS_NONE);
    },[])
    
    const classNameWrapper=useMemo(()=>{
        return `${className}_${status}`;
    },[className,status]);
    
    return {
        className:classNameWrapper,
        onLeave,
        onRemove
    }
}

export {
    useAnimate
}