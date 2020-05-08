import React, { useState, useEffect,useRef } from 'react';
import { classNames } from '../components/helper/className';
import { Transition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../ConfigContext';
import Popper from '../Popper';
import useForkRef from '../_utils/useForkRef';
import useControlled from '../_utils/useControlled';

import setRef from '../_utils/setRef';
import useIsFocusVisible from '../_utils/useIsFocusVisible';
import "./index.scss";
import { Zoom,Fade,Fold,Grow } from '../Animate';
const duration = 300;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};
const TooltipComponent=Zoom;

const getPlacement = (placement) => {
    switch (placement) {
        case "topStart":
            return "top-start";
        case "top":
            return "top";
        case "topEnd":
            return "top-end";
        case "bottomStart":
            return "bottom-start";
        case "bottom":
            return "bottom";
        case "bottomEnd":
            return "bottom-end";
        case "rightStart":
            return "right-start";
        case "right":
            return "right";
        case "rightEnd":
            return "right-end";
        case "leftStart":
            return "left-start";
        case "left":
            return "left";
        case "leftEnd":
            return "left-end";
        default:
            return "top";
    }
}

const Tooltip = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        arrow=true,
        disableTouchListener = false,
        disableHoverListener = false,
        disableFocusListener = false,
        disableClickListener = false,
        enterTouchDelay = 700,
        enterDelay = 100,
        className,
        children,
        mountNode,
        title,
        onOpen,
        visible: openProp,
        leaveDelay = 0,
        onClose,
        placement,
        trigger="hover",
        animation="zoom",
        defaultVisible=false,
        ...restProps
    } = Props;
 
    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [childNode, setChildNode] = React.useState();
    const ignoreNonTouchEvents = React.useRef(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const [openState, setOpenState] = useControlled({
        controlled: openProp,
        default: defaultVisible
    });

    let open = openState;

    const leaveTimer = React.useRef();
    const touchTimer = React.useRef();

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("tooltip", customizePrefixCls);

    const handleUseRef = useForkRef(setChildNode, ref);
    const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);

    const handleOwnRef = React.useCallback(
        (instance) => {
          
            setRef(handleFocusRef, ReactDOM.findDOMNode(instance))
        },
        [handleFocusRef]
    );

    const handleRef = useForkRef(children.ref, handleOwnRef);

    const childrenProps = {
        ref: handleRef,
    }

    const handleOpen = (event) => {

        // The mouseover event will trigger for every nested element in the tooltip.
        // We can skip rerendering when the tooltip is already open.
        // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
        setOpenState(true);

        if (onOpen) {
            onOpen(event);
        }
    };

    const handleClose = (event) => {

        setOpenState(false);

        if (onClose) {
            onClose(event);
        }


    };

    const handleEnter = (forward = true) => (event) => {
 
        const childrenProps = children.props;

        if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
            childrenProps.onMouseOver(event);
        }

        if (event.type === 'click' && childrenProps.onClick && forward) {
            childrenProps.onClick(event);
        }

        if(openState){
            handleClose(event);
            return ;
        }

        handleOpen(event);
    };

    const handleLeave = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childNode
        ) {
            childrenProps.onMouseLeave(event);
        }

        leaveTimer.current = setTimeout(() => {
            handleClose(event);
        }, leaveDelay);
    };


    const handleTouchStart = (event) => {

        if (childrenProps.onTouchStart) {
            childrenProps.onTouchStart(event);
        }

        touchTimer.current = setTimeout(() => {
            handleEnter()(event);
        }, enterTouchDelay);
    };

    
 
    if (!disableHoverListener && trigger==="hover") {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave();
    }

    if (!disableTouchListener) {
        childrenProps.onTouchStart = handleTouchStart;
        //childrenProps.onTouchEnd = handleTouchEnd;
    }

    if(!disableClickListener && trigger==="click" ){
        childrenProps.onClick=handleEnter();
    }

    const classes = classNames(prefixCls, className);

    if (title === '') {
        open = false;
    }
 
    return (
        <React.Fragment>

            {React.cloneElement(children, childrenProps)}
            
            <Popper
                mountNode={childNode}
                open={childNode ? open : false}
                className={classNames("popper-tooltip")}
                placement={getPlacement(placement)}
                animation={animation}
            >
                {
                    ({TransitionProps})=>{
                        if(animation==="zoom"){
                            return  <Zoom {...TransitionProps}>
                                <div className={classes}>
                                    {title}
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Zoom>
                        }else if(animation==="fade"){
                            return <Fade {...TransitionProps}>
                                <div className={classes}>
                                    {title}
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Fade>
                        }else if(animation==="fold"){
                            return <Fold {...TransitionProps}>
                                <div className={classes}>
                                    {title}
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Fold>
                        }else if(animation==="grow"){
                            return <Grow {...TransitionProps}>
                                <div className={classes}>
                                    {title}
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Grow>
                        }else{
                            return <div className={classes}>
                                {title}
                                {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                            </div>
                        }
                        
                    }
                }
                
            </Popper>
            
        </React.Fragment>
    )
});

export default Tooltip;