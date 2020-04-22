import React, { useEffect,useState,useRef,useContext,useCallback } from 'react';
import { classNames } from '../components/helper/className';
import { throttle,ScrollTo } from '../_utils/reactUtils';
import { ConfigContext } from '../ConfigContext';
import "./index.scss";
import Button from '../ButtonBase';
import per from 'performance-now';

const BackTop = (Props) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        target,
        children,
        visibilityHeight="400px",
        onClick,
        ...restProps
    } = Props;

    const divRef=useRef(null);

    const scrollEvent=useRef(null);

    const [ visible ]=useState(false);

    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("backtop",customizePrefixCls);
 
    const renderChildren=({prefixCls})=>{

    };

    const scrollToTop=useCallback((e)=>{
        console.log(per());
        scrollTo(0,{
            getContainer: target || getDefaultTarget()
        })
        if(onClick){
            onClick(e)
        }
    },[])

    const getDefaultTarget=useCallback(()=>{
        return divRef && divRef.current && divRef.current.ownerDocument?divRef.current.ownerDocument:window;
    },[divRef]);

  
    const handleScroll=useCallback((wait)=>{
        return throttle(function(){
             
        },wait) 
    },[]);


    const bindScrollEvent=()=>{
        const container=target || getDefaultTarget();
        if(scrollEvent.current){
            container.removeEventListener("scroll",handleScroll(100))
        }
        scrollEvent.current=container.addEventListener("scroll",handleScroll(100));
    };
    
   
    useEffect(()=>{
        bindScrollEvent()
    },[]);
 
    return (
        <div className={
            classNames(prefixCls,className)
        } {...restProps} ref={divRef} onClick={scrollToTop}>
            <Button icon="arrow-up" type={"danger"} shape="circle" float />
        </div>
    )
}

export default BackTop;