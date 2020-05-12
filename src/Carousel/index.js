import React, { useCallback,useState,cloneElement,useRef,forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import ReactDOM from 'react-dom';
import setRef from '../_utils/setRef';

import "./index.scss";

const Carousel = forwardRef((props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style,
        selectedIndex=1,
        ...restProps
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);

    const containerRef=useRef(null);

    // 当切换的时候，改变的就是当前位置状态
    // 所以定义当前位置,可以通过传入的selectedIndex来控制最开始显示第几个轮播图,默认从1开始
    const [active,setActive]=useState(selectedIndex);
    //获取当前可视区容器宽度
    const prefixCls=getPrefixCls("carousel",customizePrefixCls);
     
    const classes = classNames(prefixCls,className,
        {
            
        }  
    );

    useEffect(()=>{
        console.log(containerRef.current.clientWidth)
        setTransition();
    },[active]);

    const setTransition=()=>{
        // 计算需要移动的距离并进行修改，这是切换的核心
        const distance = (1 - active) * containerRef.current.clientWidth;
        containerRef.current.style.transform = `translate3d(${distance}px, 0, 0)`;
 
    }

    // 为了演示是否成功，添加两个按钮来切换
    // 上一页
    const handlePrev = () => {
        // 对临界值进行处理
        setActive(active === 1 ? children.length : active - 1)
    }

    const handleNext = () => {
        // 对临界值进行处理
        setActive(active === children.length ? 1 : active + 1);
    }
 

    const handleRef=useCallback((instance)=>{
        setRef(ref, ReactDOM.findDOMNode(instance));
    },[ref]);

    

    return (
        <div className={classes} {...restProps} style={style} ref={handleRef}>
            <div className={
                classNames(
                    `${prefixCls}-container`
                )
            }   ref={containerRef}>
                {
                    React.Children.map(children,(child,index)=>{
                      
                        return  cloneElement(child,{
                            style:{
                                ...child.props.style,
                            },
                            className: classNames(
                                `${prefixCls}-item`
                            ),
                        })
                    })
                }
            </div>
            <ul className={
                classNames(
                    `${prefixCls}-dots`
                )
            }>
                <div onClick={handlePrev} className={classNames(`${prefixCls}-buttonLeft`)}>Left</div>
                <div onClick={handleNext} className={classNames(`${prefixCls}-buttonRight`)}>Right</div>
            </ul>
        </div>
    )
});

export default Carousel;