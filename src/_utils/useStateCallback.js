import { useState, useEffect } from "react";

export default function useStateCallback(initial,callback){
    const [state,setState]=useState(initial);

    const setStateWrapper=(nextState,callback)=>{
        if(typeof callback==="function"){
            //prevState
            if(callback(state,nextState)===false){
                return ;
            }
        }
        setState(nextState);
    }

    useEffect(()=>{ 
        if(typeof callback==="function"){
            callback(state);
        }
    },[state]);

    return [state,setStateWrapper];
}