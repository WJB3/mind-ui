import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import "./index.scss";
const Fade = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProp,
        isDestory=true,
        onEnter,
        onExited,
        onExit
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("animate-fade", customizePrefixCls);

    const handleEnter = (node, isAppearing) => {
        //reflow(node); // So the animation always start from the start.
 
        if (onEnter) {
          onEnter(node, isAppearing);
        }
    };

    const handleExit=(node,isAppearing)=>{
        if(onExit){
            onExit(node, isAppearing);
        }
    }

    const handleExited=(node,isAppearing)=>{
 
        if(onExited){
            onExited(node, isAppearing);
        }
    }


    return (
        <CSSTransition
            in={inProp}
            timeout={300}
            appear
            classNames={classNames(prefixCls)}
            unmountOnExit={isDestory}
            onEnter={handleEnter}
            onExit={handleExit}
            onExited={handleExited}
        >
            {children}
        </CSSTransition>

    )
});

export default Fade;