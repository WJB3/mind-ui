import React  from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import "./index.scss";
 
 
const Zoom=React.forwardRef((Props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        children,
        in:inProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExiting,
        component:Component='span',
    }=Props;

    const wrapperRef=React.useRef(null);

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("animate-zoom",customizePrefixCls);

  
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
        // if(timeout==="auto"){

        // }
    }

    return(
        <CSSTransition
            in={inProp}
            timeout={300}
            classNames={prefixCls}
            unmountOnExit
        >
            {children}
        </CSSTransition>
    
    )
});

export default Zoom;