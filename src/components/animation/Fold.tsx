import React from 'react';
import { classNames } from './../helper/className';
import { prefixClassname } from './../_utils/config';
import { Transition } from 'react-transition-group';
import "./../styles/animation.scss";
 
interface Props{
   in?:boolean,
   onEnter?:any,
   onEntered?:any,
   onEntering?:any,
   onExit?:any,
   onExiting?:any,
   children?:any,
   component?:any
}

const Fold:React.FunctionComponent<Props>=React.forwardRef((Props,ref)=>{

    const {
        children,
        in:inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExiting,
        component:Component='div'
    }=Props;

    const classes=classNames(
        `${prefixClassname}-animation-fold`
    );

    const handleEnter=(node,isAppearing)=>{
        if (onEnter) {
            onEnter(node, isAppearing);
        }
    }

    const handleEntered=(node,isAppearing)=>{
        if(onEntered){
            onEntered(node,isAppearing)
        }
    }

    const handleEntering=(node,isAppearing)=>{
        if(onEntering){
            onEntering(node,isAppearing)
        }
    }

    const handleExit=(node)=>{
        if(onExit){
            onExit(node)
        }
    }

    const handleExiting=(node)=>{
        if(onExiting){
            onExiting(node)
        }
    }

    const addEndListener=(_,next)=>{
        if(timeout==="auto"){

        }
    }

    return(
        <Transition
            in={inProp}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExiting={handleExiting}
        >
            {
                (state,childrenProps)=>(
                    <Component>
                        
                    </Component>
                )
            }
        </Transition>
    
    )
});

export default Fold;