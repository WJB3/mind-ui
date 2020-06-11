import React, { useEffect } from 'react';
/**
 * 如果可控则不可修改为checked状态
 * @param {*} param0 
 */
export default function useInputControlled({controlled,default:defaultProp}){

    let isControlled=controlled!==undefined;
 
    const [valueState,setValue]=React.useState(defaultProp);

    const value=isControlled?controlled:valueState;
 
    const setValueIfUncontrolled=React.useCallback((newValue)=>{
       
        if(!isControlled){
            setValue(newValue);
        }
    },[value]);

    return [value,setValueIfUncontrolled];
}