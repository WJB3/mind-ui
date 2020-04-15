import React,{useRef} from 'react';
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

const Fade:React.FunctionComponent<Props>=React.forwardRef((Props,ref)=>{

    const {
        children,
        in:inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExiting,
        component:Component='div',
 
    }=Props;

   

    const handleEnter=(node:any,isAppearing:any)=>{
        
        if (onEnter) {
            onEnter(node, isAppearing);
        }
    }

    const handleEntered=(node:any,isAppearing:any)=>{
        
        node.style.transition="opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";

        if(onEntered){
            onEntered(node,isAppearing)
        }
    }

    const handleEntering=(node:any,isAppearing:any)=>{
       

        if(onEntering){
            onEntering(node,isAppearing)
        }
    }

    const handleExit=(node:any)=>{

        if(onExit){
            onExit(node)
        }
    }

    const handleExiting=(node:any)=>{
        
        if(onExiting){
            onExiting(node)
        }
    }

    const addEndListener=(_:any,next:any)=>{
       
    }

    return(
        <Transition
            appear
            in={inProp}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExiting={handleExiting}
            timeout={300}
        >
            {
                (state:any,childrenProps:any)=>{
                   
                   return <Component
                        className={
                            classNames(`${prefixClassname}-animation-fade-container`,{
                                [`${prefixClassname}-animation-fade-entered`]:state==='entered',
                                [`${prefixClassname}-animation-fade-exited`]:state==='exited' && !inProp ,
                            })
                        }
                        ref={ref}
                        {...childrenProps}
                   >
                       {children} 
                    </Component>
                }
            }
        </Transition>
    
    )
});

export default Fade;