

import React from 'react';

function isEmptyArr(arr){//判断是否是空数组
    if(typeof arr==="object" && Array.isArray(arr) && arr.length===0){
        return true;
    }
    return false;
}

export default function useControlled({controlled,default:defaultProps}){
    
    let isControlled=controlled!==undefined && !isEmptyArr(controlled);
    
    const [valueState,setValueState]=React.useState(defaultProps);

    const value=isControlled?controlled:valueState;
 
    const setValueIfControlled=React.useCallback((newValue)=>{
        if(!isControlled){
            setValueState(newValue)
        }
    },[value]);

    return [value,setValueIfControlled,isControlled]
}   