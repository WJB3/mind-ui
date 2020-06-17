import React,{cloneElement} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { CSSTransition } from 'react-transition-group';
import "./index.scss";

const SliderDisplay = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProps,
        onEnter,
        onExited,
        onExit,
        status,
        ...restProps
    } = Props;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("datepicker-display-slide-monthday", customizePrefixCls);

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
            in={inProps}
            timeout={300}
            appear
            classNames={classNames(
                prefixCls,
                {
                    [`${prefixCls}-${status}`]:status
                }
            )}
            onEnter={handleEnter}
            onExit={handleExit}
            onExited={handleExited}
            {...restProps}
        >
            {
            (state, childProps) => {
                return cloneElement(children, {
                    style: {
                        visibility: state === 'exited' && !inProps ? "hidden" : undefined,
                        ...children.props.style,
                    },
                    ...childProps
                })
            }
        }
        </CSSTransition>
    

    )
});

export default SliderDisplay;