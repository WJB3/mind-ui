import React, { useState, useEffect,useRef } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import useControlled from '../_utils/useControlled';
import PropTypes from 'prop-types';
import BackDrop from '../BackDrop';
import "./index.scss";
import Tooltip from '../Tooltip';
 

 
const Popover = React.forwardRef((Props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        title,
        content,
        arrow,
        animation,
        trigger="hover",
        placement,
        visible:visibleProps,
        defaultVisible,
        onCloseBackdrop
    } = Props;
 
    const { getPrefixCls } = React.useContext(ConfigContext);

    const [visible,setVisible]=useControlled({
        controlled:visibleProps,
        default:defaultVisible
    });

    const prefixCls = getPrefixCls("popover", customizePrefixCls);
    
    const handleCloseBackdrop=(e)=>{
        if(onCloseBackdrop){
            onCloseBackdrop(e)
        }
        setVisible(false)
    }

    const handleClick=(e)=>{
        if(trigger==="click"){
            setVisible(!visible)
        }
    }

    const handleMouseOver=(e)=>{
        console.log("handleMouseOver")
        if(trigger==="hover"){
            setVisible(true)
        }
    }

    const handleMouseLeave=(e)=>{
        console.log("handleMouseLeave")
        // if(trigger==="hover"){
        //     setVisible(false)
        // }
    }
 
    return (
        <React.Fragment>

            <BackDrop open={visible}  onClick={handleCloseBackdrop} />
            
            <Tooltip 
                className={
                    classNames(
                        prefixCls,
                        className
                    )
                }
                arrow={arrow}
                animation={animation}
                visible={!!visible}
                title={
                    <div className={classNames(`${prefixCls}-inner`)}>
                        {!!title && <div className={classNames(`${prefixCls}-inner-title`)}>{title}</div>}
                        <div className={classNames(`${prefixCls}-inner-content`)}>{content}</div>
                    </div>
                }
                trigger={trigger}
                placement={placement}
            > 
                {React.cloneElement(children,{ref:children.ref,onClick:handleClick,onMouseOver:handleMouseOver,onMouseLeave:handleMouseLeave})}       
            </Tooltip>
            
        </React.Fragment>
    )
});

Popover.propTypes={
   
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
    //位置
    placement:PropTypes.string,
    //触发的时机
    trigger:PropTypes.string,
    //气泡卡片的内容
    content:PropTypes.node,
    //关闭背景的回调
    onCloseBackdrop:PropTypes.func
};


export default Popover;