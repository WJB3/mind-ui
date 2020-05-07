import React, { useEffect } from 'react';
/**
 * 如果可控则不可修改为checked状态
 * @param {*} param0 
 */
export default function useControlled({controlled,default:defaultProp}){

    console.log(controlled)
    console.log(controlled!==undefined)
    console.log(React.useRef(true))
    console.log(React.useRef(controlled!==undefined))

    const { current:isControlled }=React.useRef(controlled!==undefined);
    console.log(isControlled)
    //是否有默认值 radio表示是否设置defaultChecked
    const [valueState,setValue]=React.useState(defaultProp);
    //如果受控 选择checked的值否则选择默认值 radio表示如果设置了checked 就使用checked的值 否则设置defaultchecked
    const value=isControlled?controlled:valueState;
    console.log(value)
    

    const setValueIfUncontrolled=React.useCallback((newValue)=>{
       
        if(!isControlled){
            setValue(newValue);
        }
    },[value]);

    return [value,setValueIfUncontrolled];
}