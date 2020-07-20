import { useState, useEffect } from "react";

export default function useStateCallback(initial,callback){
    const [state,setState]=useState(initial);

    const setStateWrapper=(nextState,callback)=>{
        console.log(nextState)
        console.log(state)
        if(typeof callback==="function"){
            console.log(callback)
            //prevState
            if(callback(state,nextState)===false){
                return ;
            }
        }
        setState(nextState);
    }

    useEffect(()=>{
        console.log("Aaa")
        if(typeof callback==="function"){
            callback(state);
        }
    },[state]);

    return [state,setStateWrapper];
}