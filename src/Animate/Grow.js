import React  from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import "./index.scss";
 
const Grow=React.forwardRef((Props,ref)=>{
   
    const {
        prefixCls:customizePrefixCls,
        children,
        in:inProp,
        isDestory=true,
        onEnter,
        onExited
    }=Props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("animate-grow",customizePrefixCls);

    const handleEnter = (node, isAppearing) => {
      
      node.style.transition = "transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 133ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;";
      
      if (onEnter) {
        onEnter(node, isAppearing);
      }
    };
  
    const handleExited=(node,isAppearing)=>{
      if (onExited) {
        onExited(node, isAppearing);
      }
    }

    return(
        <CSSTransition
            appear
            in={inProp}
            timeout={300}
            classNames={classNames(prefixCls)}
            unmountOnExit={isDestory}
            onEnter={handleEnter}
            onExited={handleExited}
        >
            {(state,childProps)=>{
              return React.cloneElement(children)
            }}
        </CSSTransition>
    
    )
});

export default Grow;