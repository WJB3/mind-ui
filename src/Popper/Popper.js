import React,{useEffect,useCallback,useRef} from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { createPopper } from '@popperjs/core'
import useForkRef from '../_utils/useForkRef';
import Portal from '../Portal';
import "./index.scss";
import setRef from '../_utils/setRef';
import PropTypes from 'prop-types';


function getAnchorEl(anchorEl){
    return typeof anchorEl==="function"?anchorEl():anchorEl;
}

const Popper = React.forwardRef((Props,ref) => {
 
    const {
        prefixCls:customizePrefixCls,  
        visible,
        children,
        container,
        disablePortal=false,
        placement="top",
        mountNode,//需要挂载的节点
        className,
        transition=true,
    } = Props;

    const [exited, setExited] = React.useState(true);//定义动画是否退出
    
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("popper", customizePrefixCls);

    const classes = classNames(prefixCls, className,`${prefixCls}-${placement}`);

    const tooltipRef=useRef(null);//div为popper的节点

    const ownRef=useForkRef(tooltipRef,ref);

    const handleOpen=useCallback(()=>{
        if(!tooltipRef.current || !mountNode ||!visible){
            return ;
        }

        const popper=createPopper(getAnchorEl(mountNode),tooltipRef.current,{
            placement
        });
 
    },[mountNode, disablePortal, visible, placement]);
 
    
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
    }

    const childProps = { placement }

    if (transition) {
        childProps.TransitionProps = {
            in: visible,
            onEnter:handleEnter,
            onExited:handleExited
        };
    }

    if (!visible && (!transition || exited) ) {
        return null;
    }
  
    return (
        <Portal container={container}  disablePortal={disablePortal}>
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

Popper.propTypes={
    //是否禁用传送门
    disablePortal:PropTypes.bool,
    //指定容器
    container:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(React.Component)
    ]),
    //孩子节点
    children:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //弹框是否显示
    visible:PropTypes.bool,
    //弹框完全消失的回调
    onExited:PropTypes.func
};

export default Popper;