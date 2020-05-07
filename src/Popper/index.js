import React,{useEffect,useCallback,useRef} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { createPopper } from '@popperjs/core'
import useForkRef from '../_utils/useForkRef';
import Portal from '../Portal';
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
        mountNode,//需要挂载的节点
        className,
        transition=true,
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

    
    const handleEnter=()=>{
        setExited(false);
    };

    const handleExited=()=>{
        setExited(true);
        handleClose();
    }

    useEffect(() => {
        if (!open && !transition) { 
          handleClose();
        }
    }, [open,transition]);

    const [exited, setExited] = React.useState(true);//定义动画是否退出
    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls("popper", customizePrefixCls);
    const classes = classNames(prefixCls, className,`${prefixCls}-${placement}`);

    const childProps = { placement }

    if (animation) {
        childProps.TransitionProps = {
            in: open,
            onEnter:handleEnter,
            onExited:handleExited
        };
    }

    if (!open && (!transition || exited) ) {
        return null;
    }
  
    return (
        <Portal container={container()}  disablePortal={disablePortal}>
            <div
                ref={handleRef}
                id="popper"
                className={classes}
                style={{
                    willChange:'transform'
                }}
                 
            >
                {typeof children === 'function' ? children(childProps) : children}
   
            </div>
        </Portal>
    )
})

export default Popper;