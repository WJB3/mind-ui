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
   component?:any,
   foldHeight?:any
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
        component:Component='div',
        foldHeight="0px"
    }=Props;

    const wrapperRef:any=React.useRef(null);

    const classes=classNames(
        `${prefixClassname}-animation-fold`
    );

    const handleEnter=(node:any,isAppearing:any)=>{
        node.style.height = foldHeight;
        if (onEnter) {
            onEnter(node, isAppearing);
        }
    }

    const handleEntered=(node:any,isAppearing:any)=>{
        node.style.height = 'auto';
        if(onEntered){
            onEntered(node,isAppearing)
        }
    }

    const handleEntering=(node:any,isAppearing:any)=>{
        const wrapperHeight=wrapperRef.current?wrapperRef.current.clientHeight:0;

        node.style.height = `${wrapperHeight}px`;

        if(onEntering){
            onEntering(node,isAppearing)
        }
    }

    const handleExit=(node:any)=>{
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.height = `${wrapperHeight}px`;

        if(onExit){
            onExit(node)
        }
    }

    const handleExiting=(node:any)=>{
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.transitionDuration = `250ms`;
        node.style.height = foldHeight;
        if(onExiting){
            onExiting(node)
        }
    }

    const addEndListener=(_,next)=>{
        // if(timeout==="auto"){

        // }
    }

    return(
        <Transition
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
                            classNames(`${prefixClassname}-animation-fold-container`,{
                                [`${prefixClassname}-animation-fold-entered`]:state==='entered',
                                [`${prefixClassname}-animation-fold-hidden`]:state==='exited' && !inProp && foldHeight==='0px',
                            })
                        }
                        style={{
                            minHeight:foldHeight
                        }}
                        ref={ref}
                        {...childrenProps}
                   >
                        <div className={`${prefixClassname}-animation-fold-container-wrapper`} ref={wrapperRef}>
                            <div className={`${prefixClassname}-animation-fold-container-wrapperInner`}>
                                {children}
                            </div>
                        </div>
                    </Component>
                }
            }
        </Transition>
    
    )
});

export default Fold;