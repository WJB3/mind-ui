

import React from 'react';

export default function useControlled({controlled,default:defaultProps}){

    const { current:isControlled}=React.useRef(controlled!==undefined);
    
    const [valueState,setValueState]=React.useState(defaultProps);

    const value=isControlled?controlled:valueState;

    const setValueIfControlled=React.useCallback((newValue)=>{
        if(!isControlled){
            setValueState(newValue)
        }
    },[value]);

    return [value,setValueIfControlled]
}   