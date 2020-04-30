import React, { useEffect } from 'react';
/**
 * 如果可控则不可修改为checked状态
 * @param {*} param0 
 */
export default function useControlled({controlled,default:defaultProp}){

    const { current:isControlled }=React.useRef(controlled!==undefined);

    const [valueState,setValue]=React.useState(defaultProp);

    const value=isControlled?controlled:valueState;

    console.log(value)

    const setValueIfUncontrolled=React.useCallback((newValue)=>{
        console.log(value)
        console.log(newValue)
        if(!isControlled){
            setValue(newValue);
        }
    },[value]);

    return [value,setValueIfUncontrolled];
}