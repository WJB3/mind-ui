import * as React from 'react';
import { createPopper }  from './popper';
// import { useTheme } from '@material-ui/styles';
// import Portal from '../Portal';
import createChainedFunction from "./createChainedFunction";
import setRef from './setRef';
import useForkRef from './useForkRef';

function flipPlacement(placement, theme) {
  const direction = (theme && theme.direction) || 'ltr';

  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const defaultPopperOptions = {};

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v1/) for positioning.
 */
const Popper = React.forwardRef(function Popper(props, ref) {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: initialPlacement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef: popperRefProp,
    style,
    transition = false,
    ...other
  } = props;
  const tooltipRef = React.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);
  console.log(tooltipRef)
  console.log(ownRef)
  const popperRef = React.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  console.log(popperRef)
  console.log(handlePopperRef)
  console.log(handlePopperRefRef)
  useEnhancedEffect(() => {
    console.log("demo7")
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

 
  const rtlPlacement = "top";
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState(rtlPlacement);

  React.useEffect(() => {
    console.log("demo6")
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  const handleOpen = React.useCallback(() => {
    console.log("handleOpen")
    console.log(tooltipRef)
    console.log(anchorEl)
    console.log(open)
    if (!tooltipRef.current || !anchorEl || !open) {
      return;
    }
    console.log(popperRef.current)
    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };

    createPopper(getAnchorEl(anchorEl), tooltipRef.current, {
      placement: rtlPlacement,
    //   ...popperOptions,
    //   modifiers: {
    //     ...(disablePortal
    //       ? {}
    //       : {
    //           // It's using scrollParent by default, we can use the viewport when using a portal.
    //           preventOverflow: {
    //             boundariesElement: 'window',
    //           },
    //         }),
    //     ...modifiers,
    //     ...popperOptions.modifiers,
    //   },
    //   // We could have been using a custom modifier like react-popper is doing.
    //   // But it seems this is the best public API for this use case.
    //   onCreate: createChainedFunction(handlePopperUpdate, popperOptions.onCreate),
    //   onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate),
    });

    // handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, rtlPlacement, popperOptions]);

  const handleRef = React.useCallback(
      
    (node) => {
        console.log("handleRef")
        console.log(node)
        console.log(ownRef)
      setRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );


  const handleClose = () => {
    console.log("demo4")
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };
 

  React.useEffect(() => {
    console.log("demo3")
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);

  React.useEffect(() => {
    console.log("demo2")
    return () => {
      handleClose();
    };
  }, []);

  React.useEffect(() => {
      console.log("demo1")
    if (!open) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open]);

  if (!keepMounted && !open) {
    return null;
  }

  const childProps = { placement };

   
  return (
    // <Portal disablePortal={disablePortal} container={container}>
      <div
        ref={handleRef}
        role="tooltip"
        {...other}
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          ...style,
        }}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </div>
    // </Portal>
  );
});

export default Popper;