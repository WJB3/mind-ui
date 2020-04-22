// import { raf,cancelRaf } from './raf';

export default function throttleByAnimationFrame(fn){
    let requestId;

    const later=(args)=>()=>{
        requestId=null;
        fn(...args);
    };

    const throttled=(...args)=>{
        if(requestId==null){
            requestId=raf(later(args))
        }
    }

    throttled.cancel=()=>cancelRaf(requestId);

    return throttled;
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