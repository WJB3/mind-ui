import React, { useContext, useRef,useState,useCallback, forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";
import SizeContext from '../ConfigContext/SizeContext';
import useForkRef from '../_utils/useForkRef';
import ReactDOM from 'react-dom';

const Avatar = forwardRef((props,ref) => {
 
    const { getPrefixCls } =useContext(ConfigContext);

    const nodeRef=useRef(null);
    const stringChildrenRef=useRef(null);

    const [scale,setScale]=useState(1);

    const handleOwnRef=React.useCallback((instance)=>{
        //findDOMNode是获取真实节点的
        nodeRef.current = ReactDOM.findDOMNode(instance);
    },[])

    const handleRef=useForkRef(ref, handleOwnRef);

    const handleOwnStringRef=React.useCallback((instance)=>{
        //findDOMNode是获取真实节点的
        stringChildrenRef.current = ReactDOM.findDOMNode(instance);
    },[])

    const handleStringRef=useForkRef(ref, handleOwnStringRef);

    const setTransformScale=useCallback(()=>{
        if(!nodeRef.current||!stringChildrenRef.current){
            return ;
        }
        const childrenWidth=stringChildrenRef.current.offsetWidth;
        const nodeWidth=nodeRef.current.offsetWidth;
        if(childrenWidth ===0||nodeWidth===0){
            return ;
        }
        setScale(nodeWidth - 8<childrenWidth?(nodeWidth - 8) / childrenWidth:1);
    },[nodeRef,stringChildrenRef]);

    useEffect(()=>{
        setTransformScale();
    },[])
    
    return (
        <SizeContext.Consumer>
            {
                size => {

                    const {
                        prefixCls:customizePrefixCls,
                        size:customizeSize,//	设置头像的大小
                        className,
                        children,
                        onClick,
                        style,
                        icon,//设置头像的自定义图标
                        shape,//指定头像的形状
                        src,//	图片类头像的资源地址
                        alt,//	图像无法显示时的替代文本
                        onError,//图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为
                        ...restProps
                    } = props;

                    const prefixCls=getPrefixCls("avatar",customizePrefixCls);

                    const sizeCls=(customizeSize,size)=>{
                        let sizeCls='';
                        switch(customizeSize||size){
                            case 'large':
                                sizeCls='lg';
                                break;
                            case 'small':
                                sizeCls="sm";
                                break;
                            default:
                                break;
                        }
                        return sizeCls;
                    }
     
                    const classes = classNames(prefixCls,className,
                        {
                            [`${prefixCls}-${sizeCls(customizeSize,size)}`]: sizeCls(customizeSize,size),  
                            [`${prefixCls}-icon`]: icon,  
                            [`${prefixCls}-${shape}`]: shape, 
                            [`${prefixCls}-img`]: src, 
                        }
                    );

                    return (
                        <span className={classes} style={typeof customizeSize==="number"?{width:customizeSize,height:customizeSize,...style}:{...style}} ref={handleRef}>
                            {!!icon && <span className={`${prefixCls}-inner`}>
                                   {icon}
                            </span> }
                            {!icon && children && <span className={`${prefixCls}-string`} style={{transform: `scale(${scale}) translateX(-50%)`}} ref={handleStringRef}>
                                {children}
                            </span>}
                            {
                                src && <img src={src}/>
                            }
                        </span>
                    )
                }
            }
        </SizeContext.Consumer>
    )
});

export default Avatar;