import React from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useForkRef from '../_utils/useForkRef';
import Portals from '../Portals';
import "./index.scss";

function getAnchorEl(anchorEl){
    return typeof anchorEl==="function"?anchorEl():anchorEl;
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const Popper = React.forwardRef((Props,ref) => {
 
    const {
        prefixCls:customizePrefixCls,  
        className,
        children,
        container,
        open,
        disablePortal=false,
        popperOptions={},
        popperRef:popperRefProp,
        ...restProps
    } = Props;

    const tooltipRef=React.useRef(null);
    const ownRef=useForkRef(tooltipRef,ref);

    const popperRef=React.useRef(null);
    const handlePopperRef=useForkRef(popperRef,popperRefProp);
    const handlePoperRefRef=React.useRef(handlePopperRef);

    useEnhancedEffect(()=>{
        handlePoperRefRef.current=handlePopperRef;
    },[handlePopperRef]);

    React.useImperativeHandle(popperRefProp,()=>popperRef.current,[]);


    const handleOpen=React.useCallback(()=>{
        if(!open){
            return ;
        }
    })

    const { getPrefixCls } =React.useContext(ConfigContext);

    const prefixCls=getPrefixCls("popper",customizePrefixCls);

    const classes = classNames(prefixCls,className,
        
    );

    const handleRef=React.useCallback(
        
    )

    return (
        <Portals container={container}  disablePortal={disablePortal}>
            <div
                ref={handleRef}
                style={{
                    position:"absolute",
                    top:0,
                    left:0
                }}
            >
                {children}
            </div>
        </Portals>
    )
})

export default Popper;