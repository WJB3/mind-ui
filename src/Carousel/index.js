import React, { useCallback,useState,cloneElement,useRef,forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import ReactDOM from 'react-dom';
import setRef from '../_utils/setRef';
import Button from '../ButtonBase';

import "./index.scss";

const Carousel = forwardRef((props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProps,
        style,
        ...restProps
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);
    //获取当前可视区容器宽度
    const prefixCls=getPrefixCls("carousel",customizePrefixCls);
     
    const classes = classNames(prefixCls,className);

    const frameRef=useRef(null);
    const containerRef=useRef(null);

    const [itemWidth,setItemWidth]=useState(0);
    const [itemHeight,setItemHeight]=useState(0);
    const [current,setCurrent]=useState(1);
    
    useEffect(()=>{
        var firstSlide = frameRef.current.childNodes[0].childNodes[0];
        setDimensions();

        if(current===React.Children.count(childrenProps)+1){
            setTransition()
        }
        if(current===1){
            firstSlide.style.left=`0px`;
            containerRef.current.style.transform =`translate3d(0,0,0)`;  
        }
    },[current]);

    const setDimensions=React.useCallback(()=>{
        var firstSlide = frameRef.current.childNodes[0].childNodes[0];
        setTimeout(()=>{
            setItemWidth(frameRef.current.offsetWidth);
            setItemHeight(firstSlide.offsetHeight);
        },0)
    },[frameRef]);

    const setTransition=()=>{
         
        function transitionend(){
            //动画结束就关闭动画
            containerRef.current.style.transitionProperty="none";
            setCurrent(1);
            
            containerRef.current.removeEventListener('transitionend', transitionend, false);
        }
        containerRef.current.addEventListener('transitionend', transitionend, false);
        
    }

    const handleNext=()=>{
        containerRef.current.style.transitionProperty="transform";
        if(current===React.Children.count(childrenProps)+1){
            return ;
        }

        let firstSlide=frameRef.current.childNodes[0].childNodes[0];
         
        containerRef.current.style.transform =`translate3d(-${((current-1)+1)*itemWidth}px,0,0)`;

        setCurrent(current=>{
            if(current+1===React.Children.count(childrenProps)){
                firstSlide.style.left=`${((current+1)*itemWidth)}px`;
            }
            return current+1;
        });
    }

    const handlePrev=()=>{

    }

    return (
        <div className={classes} {...restProps} style={style} ref={ref}>
             <div className={classNames(`${prefixCls}-frame`)} ref={frameRef}>
                 <ul className={classNames(`${prefixCls}-list`)} style={{
                        width:itemWidth*React.Children.count(childrenProps),    
                        height:itemHeight
                    }} ref={containerRef}>
                    {
                        React.Children.map(childrenProps,(child,index)=>{
                            return <li key={index} style={{width:itemWidth,left:index*itemWidth}}>
                                {
                                    React.cloneElement(
                                        child,
                                        {
                                            style:{
                                                ...child.props.style,
                                                
                                            }
                                        }
                                    )
                                }
                            </li>
                        })
                    }
                    </ul>
                </div>

                <Button onClick={handleNext}>下一张</Button>
                <Button onClick={handlePrev}>上一张</Button>
        </div>
    )
});

export default Carousel;