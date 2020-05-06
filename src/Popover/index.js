import React, { useState, useEffect,useRef } from 'react';
import { classNames } from '../components/helper/className';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../ConfigContext';
import Popper from '../Popper';
import useForkRef from '../_utils/useForkRef';
import useControlled from '../_utils/useControlled';
import setRef from '../_utils/setRef';
import useIsFocusVisible from '../_utils/useIsFocusVisible';
import "./index.scss";
import { Zoom,Fade,Fold,Grow } from '../Animate';
 

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

const Popover = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        arrow=false,
        disableTouchListener = false,
        disableHoverListener = false,
        disableFocusListener = false,
        disableClickListener = false,
        enterTouchDelay = 700,
        enterDelay = 100,
        className,
        content,
        children,
        mountNode,
        title,
        onOpen,
        visible: openProp,
        leaveDelay = 0,
        onClose,
        placement,
        trigger="click",
        animation="zoom",
        defaultVisible=false,
        container,
        ...restProps
    } = Props;
 
 
    const [childNode, setChildNode] = React.useState();
    const { isFocusVisible,onBlurVisible,ref: focusVisibleRef } = useIsFocusVisible();
    const [childIsFocusVisible, setChildIsFocusVisible] = React.useState(false);

    const [openState, setOpenState] = useControlled({
        controlled: openProp,
        default: defaultVisible
    });

    let open = openState;

    const leaveTimer = React.useRef();
    const touchTimer = React.useRef();

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("popover", customizePrefixCls);

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
  
        if (event.type === 'focus' && childrenProps.onFocus && forward) {
            childrenProps.onFocus(event);
        }

        if(openState){
            handleClose(event);
            return ;
        }

        handleOpen(event);
    };

    const handleLeave = (forward = true) => (event) => {
        const childrenProps = children.props;
    
        if (event.type === 'blur') {
          if (childrenProps.onBlur && forward) {
            childrenProps.onBlur(event);
          }
          handleBlur();
        }
    
        if (
          event.type === 'mouseleave' &&
          childrenProps.onMouseLeave &&
          event.currentTarget === childNode
        ) {
          childrenProps.onMouseLeave(event);
        }

        handleClose(event);
        
    };

    const handleFocus=(forward=true)=>(event)=>{
        if(!childNode){
            setChildNode(event.currentTarget);
        }
        
        if(isFocusVisible(event)){
            setChildIsFocusVisible(true);
            handleEnter()(event);
        }
        const childrenProps = children.props;
        if (childrenProps.onFocus && forward) {
            childrenProps.onFocus(event);
        }
    }

    const handleBlur = () => {
        console.log("handleBlur");
        if (childIsFocusVisible) {
          setChildIsFocusVisible(false);
          onBlurVisible();
        }
    };

    if(!disableClickListener&& trigger==="click"){
        childrenProps.onClick=handleEnter();
    }

    if(!disableFocusListener && trigger==="focus" ){
        childrenProps.onFocus=handleFocus();
        childrenProps.onBlur=handleLeave();

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
                container={container}
                
            >
                {
                   
                    ({TransitionProps})=>{
                        if(animation==="zoom"){
                            return  <Zoom {...TransitionProps}>
                                <div className={classes}>
                                    <div className={classNames(`${prefixCls}-inner`)}>
                                        {title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                                        <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                                    </div>
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Zoom>
                        }else if(animation==="fade"){
                            return <Fade {...TransitionProps}>
                                <div className={classes}>
                                    <div className={classNames(`${prefixCls}-inner`)}>
                                        {title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                                        <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                                    </div>
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Fade>
                        }else if(animation==="fold"){
                            return <Fold {...TransitionProps}>
                                <div className={classes}>
                                    <div className={classNames(`${prefixCls}-inner`)}>
                                        {title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                                        <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                                    </div>
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Fold>
                        }else if(animation==="grow"){
                            return <Grow {...TransitionProps}>
                                <div className={classes}>
                                    <div className={classNames(`${prefixCls}-inner`)}>
                                        {title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                                        <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                                    </div>
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Grow>
                        }else{
                            return <div className={classes}>
                            <div className={classNames(`${prefixCls}-inner`)}>
                                {title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                                <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                            </div>
                            {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                        </div>
                        }
                        
                    }
                }
                
            </Popper>
            
        </React.Fragment>
    )
});

export default Popover;