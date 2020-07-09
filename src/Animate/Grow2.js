import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { ConfigContext } from '../ConfigContext';
import { classNames } from '../components/helper/className';
import { getTransitionProps } from '../transitions/utils';
import useTheme from '../styles/useTheme';

function getScale(value){
    return `scale(${value},${value**2})`;

}

const styles = {
    entering: {
      opacity: 1,
      transform: getScale(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
};
  
const Grow = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        TransitionComponent= Transition,
        in:inProp,
        style,
        timeout="auto",
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExited,
        onExiting,
        children,
        disableStrictModeCompat = false,
        ...other
    } = props;

    const timer = React.useRef();
    const autoTimeout = React.useRef();

    const theme=useTheme();

    const enableStrictModeCompat = !disableStrictModeCompat;

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("grow", customizePrefixCls);

    const handleEnter=(node,isAppearing)=>{
        const { duration:transitionDuration,delay}=getTransitionProps(
            {style,timeout},
            {mode:"enter"}
        );
        let duration;
        if(timeout==="auto"){
            duration=theme.transitions.getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        }else{
            duration=transitionDuration;
        }
        node.style.transition=[
            theme.transitions.create('opacity',{
                duration,delay
            }),
            theme.transitions.create('transform',{
                duration:duration*0.666,
                delay,
            })
        ].join(",");

        if(onEnter){
            onEnter(node,isAppearing);
        }
    }

    const handleEntering=(node,isAppearing)=>{
        if(onEntering){
            onEntering(node,isAppearing)
        }
    }

    const handleEntered=(node,isAppearing)=>{
        if(onEntered){
            onEntered(node,isAppearing)
        }
    }

    const handleExit=(node,isAppearing)=>{
        const { duration:transitionDuration,delay}=getTransitionProps(
            {style,timeout},
            {mode:"exit"}
        );
        let duration;
        if (timeout === 'auto') {
            duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        } else {
            duration = transitionDuration;
        }
        node.style.transition = [
            theme.transitions.create('opacity', {
              duration,
              delay,
            }),
            theme.transitions.create('transform', {
              duration: duration * 0.666,
              delay: delay || duration * 0.333,
            }),
        ].join(',');
        node.style.opacity = '0';
        node.style.transform = getScale(0.75);
        if(onExit){
            onExit(node,isAppearing);
        }
    }

    const handleExited=(node,isAppearing)=>{
        if(onExited){
            onExited(node,isAppearing);
        }
    }

    const handleExiting=(node,isAppearing)=>{
        if(onExiting){
            onExiting(node,isAppearing);
        }
    }

    const addEndListener = (nodeOrNext, maybeNext) => {
        const next = maybeNext;
        if (timeout === 'auto') {
          timer.current = setTimeout(next, autoTimeout.current || 0);
        }
    };

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
    }, []);
    
    return (
        <TransitionComponent
            appear
            in={inProp} 
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
            timeout={timeout === 'auto' ? null : timeout}
            addEndListener={addEndListener}
            {...other}
        >
           {
               (state,childProps)=>{
                    return React.cloneElement(children,{
                        style:{
                            opacity:0,
                            transform:getScale(0.75),
                            visibility:state==="exited" &&!inProp?"hidden":undefined,
                            ...styles[state],
                            ...style,
                            ...children.props.style
                        },
                        ref:ref,
                        ...childProps
                    })
               }
           }
        </TransitionComponent>
    )

});

Grow.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onExiting: PropTypes.func,
    style: PropTypes.object,
    timeout: PropTypes.oneOfType([
        PropTypes.oneOf(['auto']),
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
    ]),
};

export default Grow;