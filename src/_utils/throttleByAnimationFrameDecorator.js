import { func } from "prop-types";

export default function throttleByAnimationFrameDecorator(fn){
    let requestId;

    const later=(args)=>()=>{
        requestId=null;
        fn(...args);
    };

    const throttled=(args)=>{
        if(requestId==null){

        }
    }
}

export function throttleByAnimationFrameDecorator(wait){
    let previous=0;
    return function(){
        let now=Date.now();
        let context=this;
        let args=arguments;
        if(now-previous>wait){
            func.apply(context,args);
            previous=now;
        }
    }
}