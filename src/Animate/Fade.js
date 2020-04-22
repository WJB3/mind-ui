import React  from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Transition } from 'react-transition-group';
import "./index.scss";

 
 
const Fade=React.forwardRef((Props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        children,
        in:inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExiting,
        component:Component='div',
 
    }=Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("animate-fade",customizePrefixCls);

    const handleEnter=(node,isAppearing)=>{
        
        if (onEnter) {
            onEnter(node, isAppearing);
        }
    }

    const handleEntered=(node,isAppearing)=>{
        
        node.style.transition="opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";

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
                (state,childrenProps)=>{
                   
                   return <Component
                        className={
                            classNames(`${prefixCls}`,{
                                [`${prefixCls}-entered`]:state==='entered',
                                [`${prefixCls}-exited`]:state==='exited' && !inProp ,
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