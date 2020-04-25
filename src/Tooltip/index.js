import React, { useState } from 'react';
import { classNames } from '../components/helper/className';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../ConfigContext';
import Popper from '../Popper';
import useForkRef from '../_utils/useForkRef';
import useControlled from '../_utils/useControlled';
import setRef from '../_utils/setRef';
import useIsFocusVisible from '../_utils/useIsFocusVisible';
import "./index.scss";

const Tooltip = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        disableTouchListener = false,
        disableHoverListener=false,
        disableFocusListener = false,
        enterTouchDelay = 700,
        enterDelay = 100,
        className,
        children,
        mountNode,
        title,
        onOpen,
        open: openProp,
        leaveDelay=0,
        onClose,
        ...restProps
    } = Props;

    const [tooltipOpen, setToolTipOpen] = useState(false);
    const [childNode, setChildNode] = React.useState();
    const ignoreNonTouchEvents = React.useRef(false);
    const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

    const [openState, setOpenState] = useControlled({
        controlled: openProp,
        default: false
    });

    let open = openState;

    const closeTimer = React.useRef();
    const enterTimer = React.useRef();
    const leaveTimer = React.useRef();
    const touchTimer = React.useRef();

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("loading", customizePrefixCls);

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

    if (!disableHoverListener) {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave();
    }

    if (!disableTouchListener) {
        childrenProps.onTouchStart = handleTouchStart;
        //childrenProps.onTouchEnd = handleTouchEnd;
    }

    const classes = classNames(prefixCls, className);

    // There is no point in displaying an empty tooltip.
    if (title === '') {
        open = false;
    }

    return (
        <React.Fragment>
            {React.cloneElement(children, childrenProps)}
            <Popper mountNode={childNode} open={childNode ? open : false}>
                {title}
            </Popper>
        </React.Fragment>
    )
});

export default Tooltip;