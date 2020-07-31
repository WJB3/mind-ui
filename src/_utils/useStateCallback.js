import { useState, useEffect,useRef  } from "react";

export default function useStateCallback(initial,callback){
    const [state,setState]=useState(initial);
    const asyncCallback=useRef();

    const setStateWrapper=(nextState,next,prev)=>{
        if(typeof prev==="function"){
            //prevState
            if(prev(state,nextState)===false){
                return ;
            }
        }
        asyncCallback.current=typeof next==='function'?next:null;
        setState(nextState); 
    }

    useEffect(()=>{  
        if(typeof callback==="function"){
            callback(state);
        } 
        if(asyncCallback.current) asyncCallback.current(state);
    },[state]);

    return [state,setStateWrapper];
}