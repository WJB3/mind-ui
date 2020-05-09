import React, { useCallback,useState,useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import BackDrop from '../BackDrop';
import Portal from '../Portal';
import { Slide } from '../Animate';
import Button from '../ButtonBase';
import Icon from '../components/icon';
import "./index.scss";

const getDirection=(direction)=>{
    switch(direction){
        case "left":
            return "left";
        case "right":
            return "right";
        case "bottom":
            return "bottom";
        case "top":
            return "top";
        default:
            return "right";
    }
}

const Drawer = (Props) => {

    const {
        prefixCls: customizePrefixCls,//自定义class类名
        className,//传过来的class类名
        style,//传过来的style样式名     
        children,//modal子节点
        visible:visibleProps,//显示隐藏
        onClose,//点击关闭modal框的回调
        getContainer,//指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
        maskClosable=true,//点击蒙层是否允许关闭
        mask,//是否展示遮罩
        maskStyle,//遮罩样式
        drawerStyle,//用于设置 Drawer 弹出层的样式
        headerStyle,//用于设置 Drawer 头部的样式
        bodyStyle,//可用于设置 Drawer 内容部分的样式	
        title,//标题
        width=256,//宽度
        height=256,//高度, 在 placement 为 top 或 bottom 时使用
        zIndex,//设置 Drawer 的 z-index
        placement,//	抽屉的方向
        afterVisibleChange,//切换抽屉时动画结束后的回调
        keyboard,//是否支持键盘 esc 关闭
        footer,//抽屉的页脚
        footerStyle	,//抽屉页脚部件的样式
        centered=false,
        closable=true,
        closeIcon,

        ...restProps
    } = Props;

    const [visible,setVisible]=useState(visibleProps);

    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls("drawer", customizePrefixCls);

    const handleCancel=useCallback((ignore=false,label)=>(event)=>{
        if(label==="backdrop"){
            if(!maskClosable){
                return ;
            }
        }

        if(ignore){
            onClose && onClose(event);
        }

        if(!ignore){
            if(event.target===event.currentTarget){
                onClose && onClose(event);
            }
        }
        
    },[visible]);

    useEffect(()=>{
        setVisible(visibleProps)
    },[visibleProps]);

    const p=getDirection(placement);
 
    return  <Portal container={getContainer}>
        <BackDrop 
            open={visible}
            onClick={handleCancel(false,"backdrop")} 
            centered={centered} 
            disabledScroll
        >
            <Slide 
                in={visible} 
                direction={getDirection(placement)}>
            <div
                    style={{
                        zIndex,
                        width:p==="left"||p==="right"?width:undefined,
                        height:p==="top"||p==="bottom"?height:undefined,
                        ...style 
                    }}
                    className={
                        classNames(
                            prefixCls,
                            className,
                            {
                                [`${prefixCls}-centered`]:centered,
                                [`${prefixCls}-${getDirection(placement)}`]:getDirection(placement)
                            }
                        )
                    }>
                    
                    <div className={classNames(
                        `${prefixCls}-header`
                    )}>
                        {closable && <div className={classNames(
                            `${prefixCls}-header-closeIcon`
                        )} >
                            {closeIcon?closeIcon: <Icon name={"close"} onClick={handleCancel(true)}/>}
                        </div>}
                        {title}
                    </div>
                    <div className={classNames(
                        `${prefixCls}-body`
                    )} style={{...bodyStyle}}>
                        {children}
                    </div>
                    {!!footer && <div className={classNames(
                        `${prefixCls}-footer`
                    )}>
                        {footer}
                    </div>}

                   
                </div>
            </Slide>
        </BackDrop>
    </Portal>
}

export default Drawer;