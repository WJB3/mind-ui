import React, { useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import Popper from '../Popper';
import useForkRef from '../_utils/useForkRef';
import useControlled from '../_utils/useControlled';
import PropTypes from 'prop-types';
import "./index.scss";
import { Zoom,Fade,Fold,Grow,Slide } from '../Animate';
  
const Tooltip = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        arrow=false,
        className,
        children,
        title,
        visible: visibleProp,
        placement="top",
        trigger="hover",
        animation="grow",
        defaultVisible,
        onVisibleChange
    } = Props;
 
     
    const [childNode, setChildNode] = React.useState();

    const [visible, setVisible] = useControlled({
        controlled: visibleProp,
        default: defaultVisible
    });

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
 
    const handleRef = useForkRef(children.ref,setChildNode);

    const childrenProps = {
        ref: handleRef,
    }

    const handleOpen = (event) => {
        setVisible(true);
    };

    const handleClose = (event) => {
        setVisible(false);
    };

    const handleEnter = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
            childrenProps.onMouseOver(event);
           
        }

        if (event.type === 'click' && childrenProps.onClick && forward) {
            childrenProps.onClick(event);   
        } 

        if(event.type==="click"){
            
            if(visible){
                handleClose(event)
            }else{
                handleOpen(event);
            }

            return ;
        }

        handleOpen(event);
    };

    const handleLeave = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (event.type === 'mouseleave' && childrenProps.onMouseLeave && event.currentTarget === childNode) {
            childrenProps.onMouseLeave(event);
        }
        handleClose(event)
    };
 
    if (trigger==="hover") {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave();
    }
 
    if(trigger==="click"){
        childrenProps.onClick=handleEnter();
    }

    const classes = classNames(prefixCls, className,`${prefixCls}-${placement}`);

    useEffect(()=>{
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
    },[visible]);

    return (
        <React.Fragment>

            {React.cloneElement(children, childrenProps)}
            
            <Popper
                mountNode={childNode}
                visible={childNode ? visible : false}
                placement={placement}
                animation={animation}
                transition={!!animation}
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
                        }else if(animation==="slide"){
                            return <Slide {...TransitionProps}>
                                <div className={classes}>
                                    {title}
                                    {arrow && <div className={classNames(`${prefixCls}-arrow`)} />}
                                </div>
                            </Slide>
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

Tooltip.propTypes={
    //提示的内容
    title:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    //children子节点
    children:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //提示是否有箭头
    arrow:PropTypes.bool,
    //额外添加的类名
    className:PropTypes.string,
    //动画名称
    animation:PropTypes.string,
    //是否显示
    visible:PropTypes.bool,
    //默认是否显示
    defaultVisible:PropTypes.bool,
    //是否有箭头
    arrow:PropTypes.bool,
    //位置
    placement:PropTypes.string,
    //触发的时机
    trigger:PropTypes.string
};

export default Tooltip;