import React,{useEffect,useCallback,useRef} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { createPopper } from '@popperjs/core'
import useForkRef from '../_utils/useForkRef';
import Portals from '../Portals';
import "./index.scss";
import setRef from '../_utils/setRef';

function getAnchorEl(anchorEl){
    return typeof anchorEl==="function"?anchorEl():anchorEl;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const Popper = React.forwardRef((Props,ref) => {
 
    const {
        prefixCls:customizePrefixCls,  
        open,
        children,
        container,
        disablePortal=false,
        popperRef:popperRefProp,
        popperOptions,
        placement="top",
        mountNode,
        className,
        animation,
        style
    } = Props;

    const tooltipRef=useRef(null);
    const ownRef=useForkRef(tooltipRef,ref);

    const popperRef=useRef(null);
    const handlePopperRef=useForkRef(popperRef,popperRefProp);
    const handlePopperRefFunc=useRef(handlePopperRef);

    useEffect(()=>{
        handlePopperRefFunc.current=handlePopperRef;//实时更新handlePopperRefFunc
    },[handlePopperRef]);

    React.useImperativeHandle(popperRefProp, () => popperRef.current, []);
    
    const handleOpen=useCallback(()=>{
        if(!tooltipRef.current || !mountNode ||!open){
            return ;
        }

        if(popperRef.current){
            popperRef.current.destroy();
            handlePopperRefFunc.current(null);
        }

        const resolvedAnchorEl=getAnchorEl(mountNode);

        const popper=createPopper(getAnchorEl(mountNode),tooltipRef.current,{
            placement,
            modifiers: {
                // preventOverflow: { boundariesElement: 'window' },
            },
        });

        handlePopperRefFunc.current(popper);//更新popper实例到popperRef节点 方便后续操作popper实例
    },[mountNode, disablePortal, open, placement, popperOptions]);

    const handleClose=useCallback(()=>{
      
        if(!popperRef.current){
            return ;
        }
        popperRef.current.destroy();
        handlePopperRefFunc.current(null);
    },[])
    
    const handleRef=React.useCallback(
        (node)=>{
            setRef(ownRef,node);//将div id=popper节点赋值给tooltipRef
            handleOpen();
        },
        [ownRef,handleOpen]
    );

    useEffect(() => {
  
        if (!open) {
          // Otherwise handleExited will call this.
          handleClose();
        }
    }, [open]);

    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls("popper", customizePrefixCls);
    const classes = classNames(prefixCls, className,`${prefixCls}-${placement}`);

    const childProps = { placement };

    if (animation) {
        childProps.TransitionProps = {
            in: open,
         
        };
    }

    return (
        <Portals container={container}  disablePortal={disablePortal}>
           
            <div
                ref={handleRef}
                id="popper"
                className={classes}
                // style={{
                //     // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
                //     position: 'fixed',
                //     // Fix Popper.js display issue
                //     top: 0,
                //     left: 0,
                //     ...style,
                // }}
            >
                {typeof children === 'function' ? children(childProps) : children}
   
            </div>
        </Portals>
    )
})

export default Popper;