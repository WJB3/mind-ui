import React  from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Transition } from 'react-transition-group';
import "./index.scss";
 
const Fold=React.forwardRef((Props,ref)=>{

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
        foldHeight="0px",
        unmountOnExit
    }=Props;

    const wrapperRef=React.useRef(null);

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("animate-fold",customizePrefixCls);

  
    const handleEnter=(node,isAppearing)=>{
        node.style.height = foldHeight;
        if (onEnter) {
            onEnter(node, isAppearing);
        }
    }

    const handleEntered=(node,isAppearing)=>{
        node.style.height = 'auto';
        if(onEntered){
            onEntered(node,isAppearing)
        }
    }

    const handleEntering=(node,isAppearing)=>{
        const wrapperHeight=wrapperRef.current?wrapperRef.current.clientHeight:0;

        node.style.height = `${wrapperHeight}px`;

        if(onEntering){
            onEntering(node,isAppearing)
        }
    }

    const handleExit=(node)=>{
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.height = `${wrapperHeight}px`;

        if(onExit){
            onExit(node)
        }
    }

    const handleExiting=(node)=>{
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.transitionDuration = `250ms`;
        node.style.height = foldHeight;
        if(onExiting){
            onExiting(node)
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
            timeout={300}
            unmountOnExit={unmountOnExit}
        >
            {
                (state,childrenProps)=>{

                   return <Component
                        className={
                            classNames(`${prefixCls}`,{
                                [`${prefixCls}-entered`]:state==='entered',
                                [`${prefixCls}-hidden`]:state==='exited' && !inProp && foldHeight==='0px',
                            })
                        }
                        style={{
                            minHeight:foldHeight
                        }}
                        ref={ref}
                        {...childrenProps}
                   >
                        <div className={`${prefixCls}-wrapper`} ref={wrapperRef}>
                            <div className={`${prefixCls}-wrapperInner`}>
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