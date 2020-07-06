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
        autoPlay
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);
    //获取当前可视区容器宽度
    const prefixCls=getPrefixCls("carousel",customizePrefixCls);
     
    const classes = classNames(prefixCls,className);

    const frameRef=useRef(null);
    const containerRef=useRef(null);
    const childrenNum=useRef(React.Children.count(childrenProps));

    const [itemWidth,setItemWidth]=useState(0);
    const [itemHeight,setItemHeight]=useState(0);
    const [current,setCurrent]=useState(1);
    
    useEffect(()=>{
        var firstSlide = containerRef.current.childNodes[0];
        var lastSlide = containerRef.current.childNodes[childrenNum.current-1];

        // if(autoPlay){
        //     setAuto();
        // }

        setDimensions();

        if(current===childrenNum.current+1){
            setTransition();
        }
       
         
        if(current+1===childrenNum.current){
            firstSlide.style.left=`${((current+1)*itemWidth)}px`;
        }

        if(current===0){
            setPrevTransition(lastSlide);
        }

        if(current===childrenNum.current-2){
            lastSlide.style.left=`${(current+1)*itemWidth}px`;
        }

        if(current+1===childrenNum.current){
            firstSlide.style.left=`${((current+1)*itemWidth)}px`;
        }

        if(current===1){
            firstSlide.style.left=`0px`;
            lastSlide.style.left=`-${itemWidth}px`;
            containerRef.current.style.transform =`translate3d(0,0,0)`;  
        }
    },[current,itemWidth,autoPlay]);

    const setAuto=React.useCallback(()=>{
        let timer=setInterval(()=>{
            handleNext();
        },3000);
      
    },[])

    const setDimensions=React.useCallback(()=>{
        var firstSlide = containerRef.current.childNodes[0];
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

    const setPrevTransition=(lastSlide)=>{
        
        function transitionend(){
            //动画结束就关闭动画
            containerRef.current.style.transitionProperty="none";

            containerRef.current.style.transform=`translate3d(-${(childrenNum.current-1)*itemWidth}px,0,0)`;

            lastSlide.style.left=`${((childrenNum.current-1)*itemWidth)}px`;

            setCurrent(childrenNum.current);
            
            containerRef.current.removeEventListener('transitionend', transitionend, false);
        }

        containerRef.current.addEventListener('transitionend', transitionend, false);
        
    }


    const handleNext=()=>{

        containerRef.current.style.transitionProperty="transform";

        if(current===childrenNum.current+1){
            return ;
        }
    
        containerRef.current.style.transform =`translate3d(-${current*itemWidth}px,0,0)`;

        setCurrent(current+1);
    }

    const handlePrev=()=>{
        containerRef.current.style.transitionProperty="transform";

        let firstSlide=containerRef.current.childNodes[0];

        if(current===1){//当是第一个时，应该要跳转到第三个
            containerRef.current.style.transform =`translate3d(${itemWidth}px,0,0)`;
        }else{
            containerRef.current.style.transform =`translate3d(-${(current-2)*itemWidth}px,0,0)`;
        }

        setCurrent(current=>{
            
            return current-1;
        });
    }

    const handleClickDotItem=React.useCallback((item)=>{
        containerRef.current.style.transitionProperty="transform";
        containerRef.current.style.transform =`translate3d(-${(item-1)*itemWidth}px,0,0)`;
        setCurrent(item);
    },[childrenProps,itemWidth])

    return (
        <div className={classes} style={style} ref={ref}>
             <div className={classNames(`${prefixCls}-frame`)} ref={frameRef}>
                <ul className={classNames(`${prefixCls}-list`)} style={{
                        width:itemWidth*childrenNum.current,    
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

                <ul className={classNames(`${prefixCls}-dots`)}>
                    {
                        Array.from({length:childrenNum.current},(item,i)=>i+1).map((item)=>{
                            return <li key={item} className={classNames({
                                ['dot_active']:item===current
                            })}>
                             <button onClick={()=>handleClickDotItem(item)}>{item}</button>
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