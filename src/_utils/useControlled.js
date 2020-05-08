import React, { useEffect } from 'react';
/**
 * 如果可控则不可修改为checked状态
 * @param {*} param0 
 */
export default function useControlled({controlled,default:defaultProp}){
 
    const { current:isControlled }=React.useRef(controlled!==undefined);
 
    //是否有默认值 radio表示是否设置defaultChecked
    const [valueState,setValue]=React.useState(defaultProp);
    //如果受控 选择checked的值否则选择默认值 radio表示如果设置了checked 就使用checked的值 否则设置defaultchecked
    const value=isControlled?controlled:valueState;
 
    

    const setValueIfUncontrolled=React.useCallback((newValue)=>{
       
        if(!isControlled){
            setValue(newValue);
        }
    },[value]);

    return [value,setValueIfUncontrolled];
}