import React from 'react';

export default function useControlled({controlled,default:defaultProp,name,state='value'}){
    const {current:isControlled}=React.useRef(controlled!==undefined);
    const [valueState,setValue]=React.useState(defaultProp);
    const value=isControlled?controlled:valueState;

    const setValueIfUncontrolled=React.useCallback((newValue)=>{
        if(!isControlled){
            setValue(newValue);
        }
    },[]);
    return [value,setValueIfUncontrolled];
}